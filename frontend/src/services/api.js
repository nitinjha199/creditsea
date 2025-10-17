// src/services/api.js
import axios from 'axios';

const API_URL = 'https://creditsea-ib7z.onrender.com'; // Your backend URL

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('xmlfile', file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Should return { message, reportId, data }
  } catch (error) {
    // Better error handling to pass server message to frontend
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred during file upload.');
    }
  }
};

export { uploadFile };
