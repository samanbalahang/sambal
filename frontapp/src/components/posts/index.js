// Export all post components
export { default as PostForm } from './PostForm';
export { default as PostList } from './PostList';
export { default as PostCard } from './PostCard';

// Export all block components
export * from './blocks';

// Export hooks
export { default as usePost } from '../hooks/usePost';
export { default as usePosts } from '../hooks/usePosts';

// Export utilities
export { formatPostDate, generateSlug, validatePost } from '../utils/postHelpers';

// Re-export types for convenience
export * from './types';

// Default export for easy imports
const Posts = {
  // Components
  PostForm,
  PostList,
  PostCard,
  
  // Blocks (will include all exported blocks)
  ...require('./blocks'),
  
  // Hooks
  usePost,
  usePosts,
};

export default Posts;