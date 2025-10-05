import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PostList from '../../components/posts/PostList';
import PostForm from '../../components/posts/PostForm';

const PostsList  = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Mock data - replace with actual API call
      const mockPosts = [
        { id: 1, title: 'First Post', status: 'published', date: '2023-05-15', author: 'Admin' },
        { id: 2, title: 'Second Post', status: 'draft', date: '2023-05-16', author: 'Admin' },
        { id: 3, title: 'Third Post', status: 'published', date: '2023-05-17', author: 'Editor' },
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // API call to delete post
        console.log('Deleting post:', id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleFormSubmit = async (postData) => {
    try {
      if (editingPost) {
        // Update existing post
        console.log('Updating post:', postData);
        setPosts(posts.map(post => post.id === editingPost.id ? { ...post, ...postData } : post));
      } else {
        // Create new post
        console.log('Creating post:', postData);
        const newPost = { ...postData, id: Date.now(), date: new Date().toISOString(), author: 'Admin' };
        setPosts([...posts, newPost]);
      }
      setShowForm(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="posts-page">
      <div className="page-header">
        <h1>Posts</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/posts/create')}
        >
          Add New Post
        </button>
      </div>

      <PostList 
        posts={posts} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {showForm && (
        <PostForm 
          post={editingPost}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default PostsList;