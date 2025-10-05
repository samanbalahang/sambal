import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, File } from 'lucide-react';
import PageForm from '../../components/pages/PageForm';

const PageCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSave = async (pageData) => {
    setLoading(true);
    try {
      // API call to create new page
      console.log('Creating page:', pageData);
      navigate('/pages');
    } catch (error) {
      console.error('Error creating page:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/pages');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={handleCancel}>
          <ArrowLeft size={16} />
          Back to Pages
        </button>
        <h1 className="page-title">
          <File size={24} />
          Create New Page
        </h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            type="submit"
            form="page-form"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Page'}
            <Save size={16} />
          </button>
        </div>
      </div>

      <div className="page-content">
        <PageForm
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PageCreate;