import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageList from '../../components/pages/PageList';

const PagesList = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      // API call to fetch pages
      setTimeout(() => {
        const mockPages = [
          { id: 1, title: 'Home', status: 'published', author: 'Admin' },
          { id: 2, title: 'About', status: 'published', author: 'Editor' },
        ];
        setPages(mockPages);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching pages:', error);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Pages</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/pages/create')}
        >
          <Plus size={16} />
          Add New Page
        </button>
      </div>

      <PageList
        pages={pages}
        loading={loading}
      />
    </div>
  );
};

export default PagesList;