import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import MediaGrid from '../../components/media/MediaGrid';

const MediaList = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      // API call to fetch media
      setTimeout(() => {
        const mockMedia = [
          { id: 1, name: 'image1.jpg', type: 'image', size: '2.4MB' },
          { id: 2, name: 'document.pdf', type: 'document', size: '1.1MB' },
        ];
        setMedia(mockMedia);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching media:', error);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Media Library</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/media/upload')}
        >
          <Upload size={16} />
          Upload Media
        </button>
      </div>

      <MediaGrid
        media={media}
        loading={loading}
      />
    </div>
  );
};

export default MediaList;