import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, FileText, RefreshCw } from 'lucide-react';
import PostForm from '../../components/posts/PostForm';

const PostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      // API call to fetch post
      setTimeout(() => {
        const mockPost = {
          id: parseInt(id),
          title: 'Sample Post',
          content: 'Post content...',
          status: 'draft',
          slug: 'sample-post'
        };
        setPost(mockPost);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  const handleSave = async (postData) => {
    setSaving(true);
    try {
      // API call to update post
      console.log('Updating post:', postData);
      navigate('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/posts');
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-content">
          <RefreshCw size={32} className="spinning" />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn btn-secondary" onClick={handleCancel}>
          <ArrowLeft size={16} />
          Back to Posts
        </button>
        <h1 className="page-title">
          <FileText size={24} />
          Edit Post
        </h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            type="submit"
            form="post-form"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
            <Save size={16} />
          </button>
        </div>
      </div>

      <div className="page-content">
        <PostForm
          post={post}
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={saving}
        />
      </div>
    </div>
  );
};

export default PostEdit;