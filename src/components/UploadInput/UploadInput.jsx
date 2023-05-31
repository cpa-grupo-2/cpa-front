import './UploadInput.css';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadInput({ onChange, onBlur, name, ...props }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    onChange(file);
  };

  return (
    <>
      <div
        className="form-upload"
        onClick={() => document.querySelector('.input-field').click()}
      >
        <input
          name={name}
          type="file"
          accept=".csv"
          className="input-field"
          onChange={handleFileChange}
          onBlur={onBlur}
          {...props}
        />
        <CloudUploadIcon color="azureRadiance" style={{ fontSize: '100px' }} />
        <label>{fileName}</label>
      </div>
    </>
  );
}
