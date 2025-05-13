import React from 'react';
import type { EmployeeProjectDetails } from '../../utils/employeeUtils';
import { Table, ContentBox } from '../common';
import styles from './Overview.module.scss';
import ContentHeader from './Action/ContentHeader';

interface OverviewProps {
   data: EmployeeProjectDetails[];
   onClear: () => void;
}

const Overview: React.FC<OverviewProps> = ({ data, onClear }) => {
   if (!data || data.length === 0) {
      return (
         <div className={styles.noData}>
            No common projects found. Please upload a CSV file with employee data.
         </div>
      );
   }

   return (
      <ContentBox>
         <ContentHeader onClear={onClear} />
         <Table colsTemplate='repeat(4, auto)'>
            <Table.Head>Employee ID #1</Table.Head>
            <Table.Head>Employee ID #2</Table.Head>
            <Table.Head>Project ID</Table.Head>
            <Table.Head>Days Worked</Table.Head>

            {data.map((item, index) => (
               <Table.Row key={`${item.empId1}-${item.empId2}-${item.projectId}-${index}`}>
                  <Table.Cell>{item.empId1}</Table.Cell>
                  <Table.Cell>{item.empId2}</Table.Cell>
                  <Table.Cell>{item.projectId}</Table.Cell>
                  <Table.Cell>{item.daysWorked}</Table.Cell>
               </Table.Row>
            ))}
         </Table>
         <div className={styles.footer}></div>
      </ContentBox>
   );
};

export default Overview;