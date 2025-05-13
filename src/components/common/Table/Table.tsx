import React, { type ReactNode, type JSX, type HTMLProps } from 'react';
import styles from './Table.module.scss';

interface ColsType {
   cols: number;
   colsTemplate?: never;
   children: React.ReactNode;
}

interface ColsTemplateType {
   cols?: never;
   colsTemplate: string;
   children: ReactNode;
}

type TableProps = ColsType | ColsTemplateType;

const Table = ({ cols, colsTemplate, children }: Readonly<TableProps>): JSX.Element => {

   const style = {
      gridTemplateColumns: colsTemplate ?? `repeat(${cols}, auto)`
   };

   return (
      <div className={styles.tableWrapper}>
         <div className={styles.table} style={style}>
            {children}
         </div>
      </div>
   );
};

const TableHead = ({ children, ...rest }: HTMLProps<HTMLDivElement>): JSX.Element => (
   <div className={styles.tableHead} {...rest}>{children}</div>
);

const TableRow = ({ children }: Readonly<{ children: ReactNode }>): JSX.Element => <>{children}</>;

const TableCell = ({ children, ...rest }: HTMLProps<HTMLDivElement>): JSX.Element => (
   <div className={styles.tableCell} {...rest}>{children}</div>
);

Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
