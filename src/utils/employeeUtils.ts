export interface EmployeeProject {
   empId: number;
   projectId: number;
   dateFrom: Date;
   dateTo: Date | null;
}

export const parseDate = (dateStr: string): Date | null => {
   if (!dateStr || dateStr.toLowerCase() === 'null') {
      return null;
   }

   // Different date formats
   const formats = [
      'YYYY-MM-DD',
      'DD/MM/YYYY',
      'MM/DD/YYYY',
      'YYYY/MM/DD'
   ];

   for (const format of formats) {
      const parts = dateStr.split(/[-/]/);
      if (parts.length === 3) {
         let year, month, day;

         if (format === 'YYYY-MM-DD' || format === 'YYYY/MM/DD') {
            [year, month, day] = parts;
         } else if (format === 'DD/MM/YYYY') {
            [day, month, year] = parts;
         } else {
            [month, day, year] = parts;
         }

         const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
         if (!isNaN(date.getTime())) {
            return date;
         }
      }
   }

   throw new Error(`Invalid date format: ${dateStr}`);
};

export const calculateDaysOverlap = (start1: Date, end1: Date | null, start2: Date, end2: Date | null): number => {
   // Convert null dates to current date
   const end1Date = end1 || new Date();
   const end2Date = end2 || new Date();

   // Find the latest start date
   const start = new Date(Math.max(start1.getTime(), start2.getTime()));
   // Find the earliest end date
   const end = new Date(Math.min(end1Date.getTime(), end2Date.getTime()));

   // If the periods don't overlap, return 0
   if (end < start) {
      return 0;
   }

   // Calculate the difference in days
   const diffTime = Math.abs(end.getTime() - start.getTime());
   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export interface EmployeePair {
   empId1: number;
   empId2: number;
   projectId: number;
   daysWorked: number;
}

export interface EmployeeProjectDetails {
   empId1: number;
   empId2: number;
   projectId: number;
   daysWorked: number;
}

export const findLongestWorkingPair = (employeeData: EmployeeProject[]): EmployeeProjectDetails[] => {
   if (!employeeData || employeeData.length === 0) {
      return [];
   }

   const pairs: EmployeePair[] = [];
   const uniqueEmployees = [...new Set(employeeData.map(emp => emp.empId))];

   // For each unique employee pair
   for (let i = 0; i < uniqueEmployees.length; i++) {
      for (let j = i + 1; j < uniqueEmployees.length; j++) {
         const emp1 = uniqueEmployees[i];
         const emp2 = uniqueEmployees[j];

         // Get all projects for both employees
         const emp1Projects = employeeData.filter(emp => emp.empId === emp1);
         const emp2Projects = employeeData.filter(emp => emp.empId === emp2);

         // Find common project IDs
         const commonProjectIds = new Set(
            emp1Projects.map(p => p.projectId).filter(id =>
               emp2Projects.some(p => p.projectId === id)
            )
         );

         // For each common project
         commonProjectIds.forEach(projectId => {
            const emp1Project = emp1Projects.find(p => p.projectId === projectId);
            const emp2Project = emp2Projects.find(p => p.projectId === projectId);

            if (emp1Project && emp2Project) {
               const overlapDays = calculateDaysOverlap(
                  emp1Project.dateFrom,
                  emp1Project.dateTo,
                  emp2Project.dateFrom,
                  emp2Project.dateTo
               );

               if (overlapDays > 0) {
                  pairs.push({
                     empId1: emp1,
                     empId2: emp2,
                     projectId,
                     daysWorked: overlapDays
                  });
               }
            }
         });
      }
   }

   // Sort pairs by total days worked together
   const pairTotals = pairs.reduce((acc, pair) => {
      const key = `${pair.empId1}-${pair.empId2}`;
      if (!acc[key]) {
         acc[key] = {
            empId1: pair.empId1,
            empId2: pair.empId2,
            totalDays: 0,
            projects: []
         };
      }
      acc[key].totalDays += pair.daysWorked;
      acc[key].projects.push(pair);
      return acc;
   }, {} as Record<string, { empId1: number; empId2: number; totalDays: number; projects: EmployeePair[] }>);

   // Return all pairs sorted by total days worked together
   const allPairs = Object.values(pairTotals)
      .sort((a, b) => b.totalDays - a.totalDays)
      .flatMap(pair => pair.projects);

   return allPairs;
};
