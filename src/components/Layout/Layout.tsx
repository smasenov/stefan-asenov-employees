import type { ReactNode } from 'react';
import styles from './Layout.module.scss';

interface LayoutProps {
   children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <div className={styles.layout}>
         <header className={styles.header}>
            <h1>Employee Project Overlap Analyzer</h1>
         </header>
         <main className={styles.main}>
            {children}
         </main>
      </div>
   );
};

export default Layout;