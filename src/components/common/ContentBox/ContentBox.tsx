import React from 'react';
import styles from './ContentBox.module.scss';

export interface ContentBoxProps {
   children: React.ReactNode;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children }) => {
   return (
      <div className={styles.content}>
         <div className={styles.contentBox}>{children}</div>
      </div>
   );
};

export default ContentBox;