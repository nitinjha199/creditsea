// src/App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ReportDisplay from './components/ReportDisplay';
import './App.css';

function App() {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadSuccess = (data) => {
    setReportData(data);
    setError('');
  };

  const handleUploadError = (errorMessage) => {
    setError(errorMessage);
    setReportData(null);
  };
  
  return (
    <div className="container">
      <header className="app-header">
        <h1>CreditSea Report Analyser</h1>
        <p>Upload an Experian XML file to view the credit report.</p>
      </header>
      <main>
        <FileUpload 
          onUploadSuccess={handleUploadSuccess} 
          onUploadError={handleUploadError}
          setIsLoading={setIsLoading} 
        />
        {isLoading && <div className="loader">Processing...</div>}
        {error && <div className="error-message">{error}</div>}
        {reportData && <ReportDisplay data={reportData} />}
      </main>
      <footer className="app-footer">
        <p>CreditSea Fullstack Engineer Assignment</p>
      </footer>
    </div>
  );
}

export default App;