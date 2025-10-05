// Format post date for display
export const formatPostDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Generate slug from title
export const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Validate post data
export const validatePost = (postData) => {
  const errors = {};

  if (!postData.title?.trim()) {
    errors.title = 'Title is required';
  }

  if (!postData.slug?.trim()) {
    errors.slug = 'Slug is required';
  } else if (!/^[a-z0-9-]+$/.test(postData.slug)) {
    errors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
  }

  // Validate blocks if present
  if (postData.blocks) {
    const blockErrors = postData.blocks.map(validateBlock).filter(Boolean);
    if (blockErrors.length > 0) {
      errors.blocks = blockErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate individual block
const validateBlock = (block) => {
  switch (block.type) {
    case 'heading':
      if (!block.data?.content?.trim()) {
        return 'Heading content is required';
      }
      break;
    case 'text':
      if (!block.data?.content?.trim()) {
        return 'Text content is required';
      }
      break;
    case 'image':
      if (!block.data?.url?.trim()) {
        return 'Image URL is required';
      }
      break;
    default:
      return null;
  }
  return null;
};

// Extract text content from blocks for preview/excerpt
export const extractTextContent = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map(block => {
      switch (block.type) {
        case 'heading':
        case 'text':
        case 'quote':
          return block.data?.content || '';
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join(' ')
    .substring(0, 200) + '...';
};

// Default post structure
export const getDefaultPost = () => ({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  status: 'draft',
  featured_image: '',
  categories: [],
  tags: [],
  meta_title: '',
  meta_description: '',
  blocks: []
});

export default {
  formatPostDate,
  generateSlug,
  validatePost,
  extractTextContent,
  getDefaultPost
};