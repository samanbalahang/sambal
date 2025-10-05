import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, File, RefreshCw } from 'lucide-react';
import PageForm from '../../components/pages/PageForm';

const PageEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetchPage();
  }, [id]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      // API call to fetch page
      setTimeout(() => {
        const mockPage = {
          id: parseInt(id),
          title: 'Sample Page',
          content: 'Page content...',
          status: 'published',
          slug: 'sample-page'
        };
        setPage(mockPage);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching page:', error);
      setLoading(false);
    }
  };

  const handleSave = async (pageData) => {
    setSaving(true);
    try {
      // API call to update page
      console.log('Updating page:', pageData);
      navigate('/pages');
    } catch (error) {
      console.error('Error updating page:', error);
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/pages');
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-content">
          <RefreshCw size={32} className="spinning" />
          <p>Loading page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={handleCancel}>
          <ArrowLeft size={16} />
          Back to Pages
        </button>
        <h1 className="page-title">
          <File size={24} />
          Edit Page
        </h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            type="submit"
            form="page-form"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
            <Save size={16} />
          </button>
        </div>
      </div>

      <div className="page-content">
        <PageForm
          page={page}
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={saving}
        />
      </div>
    </div>
  );
};

export default PageEdit;