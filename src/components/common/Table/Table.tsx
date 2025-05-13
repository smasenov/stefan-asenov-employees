import React, { type ReactNode } from 'react';
import styles from './Table.module.scss';

interface TableProps {
   colsTemplate: string;
   children: ReactNode;
}

const Table: React.FC<TableProps> & {
   Head: React.FC<{ children: ReactNode }>;
   Row: React.FC<{ children: ReactNode }>;
   Cell: React.FC<{ children: ReactNode }>;
} = ({ colsTemplate, children }) => {
   return (
      <div className={styles.tableWrapper}>
         <div className={styles.table} style={{ gridTemplateColumns: colsTemplate }}>
            {children}
         </div>
      </div>
   );
};

Table.Head = ({ children }) => <div className={styles.tableHead}>{children}</div>;
Table.Row = ({ children }) => <>{children}</>;
Table.Cell = ({ children }) => <div className={styles.tableCell}>{children}</div>;

export default Table;
