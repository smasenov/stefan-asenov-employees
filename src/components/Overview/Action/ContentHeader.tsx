import styles from './ContentHeader.module.scss';

interface ContentHeaderProps {
   onClear: () => void;
}

const ContentHeader = ({ onClear }: ContentHeaderProps) => {
   return (
      <div className={styles.header}>
         <div className={styles.headerTitle}>
            <h2>Total days worked together</h2>
         </div>
         <button
            className={styles.clearButton}
            onClick={onClear}
         >
            Clear Data
         </button>
      </div>
   );
};

export default ContentHeader;