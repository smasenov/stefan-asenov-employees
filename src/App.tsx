import { Layout, FileUpload, Overview } from './components';

import { useProjectOverlaps } from './hooks/useFileUpload';

const App = () => {
  const { projectOverlaps, handleFileSelect, clearData, fileInputRef, error } = useProjectOverlaps();

  return (
    <Layout>
      <FileUpload
        onFileSelect={handleFileSelect}
        disabled={projectOverlaps.length > 0}
        fileInputRef={fileInputRef}
        error={error}
      />
      <Overview
        data={projectOverlaps}
        onClear={clearData}
      />
    </Layout>
  );
};

export default App;
