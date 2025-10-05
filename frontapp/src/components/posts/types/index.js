// Post-related type definitions
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  SCHEDULED: 'scheduled'
};

export const POST_STATUS_OPTIONS = [
  { value: POST_STATUS.DRAFT, label: 'Draft', color: 'gray' },
  { value: POST_STATUS.PUBLISHED, label: 'Published', color: 'green' },
  { value: POST_STATUS.ARCHIVED, label: 'Archived', color: 'red' },
  { value: POST_STATUS.SCHEDULED, label: 'Scheduled', color: 'blue' }
];

export const POST_CATEGORIES = [
  'uncategorized',
  'news',
  'blog',
  'tutorial',
  'update',
  'announcement'
];

// Post type definition
export const PostType = {
  id: String,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  status: String,
  featured_image: String,
  author: Object,
  categories: Array,
  tags: Array,
  meta_title: String,
  meta_description: String,
  created_at: String,
  updated_at: String,
  published_at: String,
  blocks: Array
};

// Props types for components
export const PostFormProps = {
  post: Object,
  onSave: Function,
  onCancel: Function,
  loading: Boolean,
  errors: Object
};

export const PostListProps = {
  posts: Array,
  loading: Boolean,
  onEdit: Function,
  onDelete: Function,
  onView: Function,
  pagination: Object,
  onPageChange: Function
};

export default {
  POST_STATUS,
  POST_STATUS_OPTIONS,
  POST_CATEGORIES,
  PostType,
  PostFormProps,
  PostListProps
};