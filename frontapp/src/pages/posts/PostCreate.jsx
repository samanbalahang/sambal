import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, FileText } from 'lucide-react';
import PostForm from '../../components/posts/PostForm';

const PostCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSave = async (postData) => {
    setLoading(true);
    try {
      // API call to create new post
      console.log('Creating post:', postData);
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/posts');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={handleCancel}>
          <ArrowLeft size={16} />
          Back to Posts
        </button>
        <h1 className="page-title">
          <FileText size={24} />
          Create New Post
        </h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            type="submit"
            form="post-form"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Post'}
            <Save size={16} />
          </button>
        </div>
      </div>

      <div className="page-content">
        <PostForm
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PostCreate;