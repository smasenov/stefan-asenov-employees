export interface EmployeeProject {
   empId: number;
   projectId: number;
   dateFrom: Date;
   dateTo: Date | null;
}

export interface ProjectOverlap {
   empId: number;
   projectId: number;
   dateFrom: Date;
   dateTo: Date | null;
} 