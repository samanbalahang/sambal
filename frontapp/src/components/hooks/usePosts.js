import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const usePosts = (filters = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchPosts();
  }, [filters, pagination.page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        page_size: pagination.pageSize,
        ...filters
      };

      const response = await api.get('/posts/', { params });
      setPosts(response.data.results);
      setPagination(prev => ({
        ...prev,
        total: response.data.count,
        totalPages: Math.ceil(response.data.count / prev.pageSize)
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      setError(null);
      const response = await api.post('/posts/', postData);
      setPosts(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
      throw err;
    }
  };

  const updatePost = async (postId, postData) => {
    try {
      setError(null);
      const response = await api.put(`/posts/${postId}/`, postData);
      setPosts(prev => prev.map(post => 
        post.id === postId ? response.data : post
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
      throw err;
    }
  };

  const deletePost = async (postId) => {
    try {
      setError(null);
      await api.delete(`/posts/${postId}/`);
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
      throw err;
    }
  };

  const setPage = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const setPageSize = (pageSize) => {
    setPagination(prev => ({ ...prev, pageSize, page: 1 }));
  };

  const refetch = () => {
    fetchPosts();
  };

  return {
    posts,
    loading,
    error,
    pagination,
    createPost,
    updatePost,
    deletePost,
    setPage,
    setPageSize,
    refetch
  };
};

export default usePosts;