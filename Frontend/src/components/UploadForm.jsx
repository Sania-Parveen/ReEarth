// File: src/components/UploadForm.jsx
import { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onResult }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      onResult(res.data.class || 'No class returned');
    } catch (error) {
      console.error('Error:', error);
      onResult('Prediction failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
        Predict
      </button>
    </form>
  );
};

export default UploadForm;
