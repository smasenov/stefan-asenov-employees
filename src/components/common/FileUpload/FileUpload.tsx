import { useCallback, type FC, type DragEvent, type ChangeEvent } from 'react';
import styles from './FileUpload.module.scss';

interface FileUploadProps {
   onFileSelect: (file: File) => void;
   disabled?: boolean;
   fileInputRef?: React.RefObject<HTMLInputElement | null>;
   error?: string;
}

const FileUpload: FC<FileUploadProps> = ({ onFileSelect, disabled, fileInputRef, error }) => {

   const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      if (!file) return;

      if (file.type !== 'text/csv') {
         onFileSelect(new File([], 'error.csv'));
         return;
      }

      onFileSelect(file);
   }, [onFileSelect]);

   const handleFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === 'text/csv') {
         onFileSelect(file);
      }
   }, [onFileSelect]);

   const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
   }, []);

   return (
      <div
         className={`${styles.uploadContainer} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''}`}
         onDrop={disabled ? undefined : handleDrop}
         onDragOver={disabled ? undefined : handleDragOver}
      >
         <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className={styles.fileInput}
            id="file-upload"
            disabled={disabled}
            ref={fileInputRef}
         />
         <label htmlFor="file-upload" className={styles.uploadLabel}>
            <div className={styles.uploadContent}>
               <span className={styles.uploadIcon}>📁</span>
               <span>{disabled ? 'File already uploaded' : 'Drag and drop a CSV file here or click to browse'}</span>
               <span className={styles.uploadHint}>Only CSV files are supported</span>
            </div>
         </label>
         {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
   );
};

export default FileUpload;