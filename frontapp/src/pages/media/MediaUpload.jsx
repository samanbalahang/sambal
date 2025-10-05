import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';

const MediaUpload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (fileData) => {
    setLoading(true);
    try {
      // API call to upload media
      console.log('Uploading media:', fileData);
      navigate('/media');
    } catch (error) {
      console.error('Error uploading media:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/media');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={handleCancel}>
          <ArrowLeft size={16} />
          Back to Media
        </button>
        <h1 className="page-title">
          <Upload size={24} />
          Upload Media
        </h1>
      </div>

      <div className="page-content">
        {/* Media upload form will go here */}
        <p>Media upload form component</p>
      </div>
    </div>
  );
};

export default MediaUpload;