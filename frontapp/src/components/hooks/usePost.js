import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setPost(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/posts/${postId}/`);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const updatePost = async (postData) => {
    try {
      setError(null);
      const response = postId 
        ? await api.put(`/posts/${postId}/`, postData)
        : await api.post('/posts/', postData);
      
      setPost(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
      throw err;
    }
  };

  const deletePost = async () => {
    try {
      setError(null);
      await api.delete(`/posts/${postId}/`);
      setPost(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
      throw err;
    }
  };

  return {
    post,
    loading,
    error,
    updatePost,
    deletePost,
    setPost
  };
};

export default usePost;