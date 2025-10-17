// src/components/FileUpload.js
import React, { useState } from 'react';
import { uploadFile } from '../services/api';

const FileUpload = ({ onUploadSuccess, onUploadError, setIsLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      onUploadError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    onUploadError(''); // Clear previous errors

    try {
      const result = await uploadFile(selectedFile);
      onUploadSuccess(result.data);
      console.log(result.data); // Pass the 'data' object to the parent
    } catch (error) {
      onUploadError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <button type="submit" disabled={!selectedFile}>Upload & Process</button>
    </form>
  );
};

export default FileUpload;