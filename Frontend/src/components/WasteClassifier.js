import React, { useState } from "react";

const WasteClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.predicted_class);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Waste Classifier</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload & Predict"}
      </button>

      {prediction !== null && (
        <p>
          🔍 Predicted Class: <strong>{prediction}</strong>
        </p>
      )}
    </div>
  );
};

export default WasteClassifier;
