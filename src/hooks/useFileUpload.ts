import { useState, useRef } from "react";
import { parseDate, findLongestWorkingPair, type EmployeeProjectDetails, type EmployeeProject } from '../utils/employeeUtils';

export const useProjectOverlaps = () => {
   const [projectOverlaps, setProjectOverlaps] = useState<EmployeeProjectDetails[]>([]);
   const [error, setError] = useState<string>('');
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleFileSelect = async (file: File) => {
      try {

         if (file.name === 'error.csv') {
            setError('Invalid file type. Please upload a CSV file.');
            return;
         }
         setError('');
         const text = await file.text();
         const rows = text.split('\n').slice(1).filter(row => row.trim());

         const employeeData: EmployeeProject[] = rows.map((row, i) => {
            const [EmpID, ProjectID, DateFrom, DateTo] = row.split(/[,;]/).map(f => f.trim());

            const from = parseDate(DateFrom);
            const to = parseDate(DateTo);

            if (!EmpID || !ProjectID || !from) {
               throw new Error(`Invalid data on line ${i + 2}`);
            }

            return {
               empId: parseInt(EmpID),
               projectId: parseInt(ProjectID),
               dateFrom: from,
               dateTo: to || new Date(), // If DateTo is NULL, use current date
            };
         });

         const commonProjects = findLongestWorkingPair(employeeData);
         setProjectOverlaps(commonProjects);
      } catch (error) {
         setError("Error processing file. Please make sure it's a valid CSV file with the correct format.");
         console.error("Error processing file:", error);
      }
   };

   const clearData = () => {
      setProjectOverlaps([]);
      setError('');
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   };

   return {
      projectOverlaps,
      handleFileSelect,
      clearData,
      fileInputRef,
      error
   };
};