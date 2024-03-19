import React, { useState } from 'react';
import './Step1.css';

const Step1 = ({ onNext, onFileChange, fileError }) => {
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      onFileChange(event); 
    } else {
      setPreviewURL(null);
    //   onFileChange(event); 
    }
  };

  return (
    <div>
      <div className="fileInput">
        <input type="file" accept=".png" onChange={handleFileChange} />
        {fileError && <div>{fileError}</div>}
      </div>
      <div className="imgPreview">
        {previewURL && <img src={previewURL} alt="Preview" />}
      </div>
      <div className="centerText">
        <button className="submitButton" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Step1;
