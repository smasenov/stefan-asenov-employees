import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Table from './Table';
import styles from './Table.module.scss';
// TODO: Set up tests in 'spret' folder and include all tests in that folder

describe('Table Component', () => {
   // TODO:  Clean up the tests — this is just the initial setup.
   it('renders table headers correctly', () => {
      render(
         <Table colsTemplate='repeat(4, auto)'>
            <Table.Head>Header 1</Table.Head>
            <Table.Head>Header 2</Table.Head>
            <Table.Head>Header 3</Table.Head>
            <Table.Head>Header 4</Table.Head>
         </Table>
      );

      expect(screen.getByText('Header 1')).toBeInTheDocument();
      expect(screen.getByText('Header 2')).toBeInTheDocument();
      expect(screen.getByText('Header 3')).toBeInTheDocument();
      expect(screen.getByText('Header 4')).toBeInTheDocument();
   });

   it('renders table rows and cells correctly', () => {
      render(
         <Table colsTemplate='repeat(4, auto)'>
            <Table.Head>Header 1</Table.Head>
            <Table.Head>Header 2</Table.Head>
            <Table.Head>Header 3</Table.Head>
            <Table.Head>Header 4</Table.Head>
            <Table.Row>
               <Table.Cell>Cell 1</Table.Cell>
               <Table.Cell>Cell 2</Table.Cell>
               <Table.Cell>Cell 3</Table.Cell>
               <Table.Cell>Cell 4</Table.Cell>
            </Table.Row>
         </Table>
      );

      expect(screen.getByText('Cell 1')).toBeInTheDocument();
      expect(screen.getByText('Cell 2')).toBeInTheDocument();
      expect(screen.getByText('Cell 3')).toBeInTheDocument();
      expect(screen.getByText('Cell 4')).toBeInTheDocument();
   });

   it('applies custom column template', () => {
      const { container } = render(
         <Table colsTemplate='repeat(2, 1fr)'>
            <Table.Head>Header 1</Table.Head>
            <Table.Head>Header 2</Table.Head>
         </Table>
      );

      const table = container.querySelector(`.${styles.table}`);
      expect(table).toHaveStyle({ gridTemplateColumns: 'repeat(2, 1fr)' });
   });

   it('renders empty table correctly', () => {
      const { container } = render(<Table colsTemplate='repeat(4, auto)'>{null}</Table>);
      const tableWrapper = container.querySelector(`.${styles.tableWrapper}`);
      const table = container.querySelector(`.${styles.table}`);
      expect(tableWrapper).toBeInTheDocument();
      expect(table).toBeInTheDocument();
   });

   it('renders multiple rows correctly', () => {
      render(
         <Table colsTemplate='repeat(2, auto)'>
            <Table.Head>Header 1</Table.Head>
            <Table.Head>Header 2</Table.Head>
            <Table.Row>
               <Table.Cell>Row 1 Cell 1</Table.Cell>
               <Table.Cell>Row 1 Cell 2</Table.Cell>
            </Table.Row>
            <Table.Row>
               <Table.Cell>Row 2 Cell 1</Table.Cell>
               <Table.Cell>Row 2 Cell 2</Table.Cell>
            </Table.Row>
         </Table>
      );

      expect(screen.getByText('Row 1 Cell 1')).toBeInTheDocument();
      expect(screen.getByText('Row 1 Cell 2')).toBeInTheDocument();
      expect(screen.getByText('Row 2 Cell 1')).toBeInTheDocument();
      expect(screen.getByText('Row 2 Cell 2')).toBeInTheDocument();
   });
}); 