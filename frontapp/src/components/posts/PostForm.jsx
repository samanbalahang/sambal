import React, { useState, useEffect } from 'react';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Calendar,
  Image,
  Tag,
  Settings,
  FileText,
  ChevronDown,
  Plus
} from 'lucide-react';
import { BlockRenderer, BlockButton, BlockModal } from './blocks';
import { generateSlug, validatePost } from '../../utils/postHelpers';
import { POST_STATUS_OPTIONS, POST_CATEGORIES } from './types';

const PostForm = ({ 
  post, 
  onSave, 
  onCancel, 
  loading = false,
  errors: externalErrors = {} 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    featured_image: '',
    categories: [],
    tags: [],
    meta_title: '',
    meta_description: '',
    publish_date: '',
    blocks: []
  });

  const [errors, setErrors] = useState({});
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        status: post.status || 'draft',
        featured_image: post.featured_image || '',
        categories: post.categories || [],
        tags: post.tags || [],
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        publish_date: post.publish_date || '',
        blocks: post.blocks || []
      });
      setIsSlugManual(!!post.slug);
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'title' && !isSlugManual) {
      setFormData(prev => ({ 
        ...prev, 
        slug: generateSlug(value) 
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSlugChange = (e) => {
    setFormData(prev => ({ ...prev, slug: e.target.value }));
    setIsSlugManual(true);
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleBlockUpdate = (blockId, newData) => {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => 
        block.id === blockId ? { ...block, data: { ...block.data, ...newData } } : block
      )
    }));
  };

  const handleBlockRemove = (blockId) => {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }));
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  };

  const handleBlockDuplicate = (blockId) => {
    const blockToDuplicate = formData.blocks.find(block => block.id === blockId);
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: Date.now() + Math.random(),
        data: { ...blockToDuplicate.data }
      };
      
      const index = formData.blocks.findIndex(block => block.id === blockId);
      const newBlocks = [...formData.blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      
      setFormData(prev => ({ ...prev, blocks: newBlocks }));
    }
  };

  const handleInsertBlock = (blockType) => {
    const newBlock = {
      id: Date.now() + Math.random(),
      type: blockType,
      data: {}
    };
    
    setFormData(prev => ({ 
      ...prev, 
      blocks: [...prev.blocks, newBlock] 
    }));
    setSelectedBlock(newBlock.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validatePost(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(formData);
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const renderSidebar = () => (
    <div className="space-y-6">
      {/* Publish Settings */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">Publish</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {POST_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publish Date
            </label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="datetime-local"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : (post ? 'Update' : 'Publish')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-2">
          {POST_CATEGORIES.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">Featured Image</h3>
        <div className="space-y-3">
          {formData.featured_image ? (
            <div className="relative">
              <img
                src={formData.featured_image}
                alt="Featured"
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <Plus size={16} className="rotate-45" />
              </button>
            </div>
          ) : (
            <label className="block p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-gray-400 transition-colors">
              <Image size={24} className="mx-auto text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Set featured image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setFormData(prev => ({ ...prev, featured_image: e.target.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3">SEO Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              name="meta_description"
              value={formData.meta_description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO description"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {post ? 'Edit Post' : 'Create Post'}
              </h1>
              <p className="text-sm text-gray-600">
                {post ? 'Update your post content' : 'Start creating amazing content'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Eye size={18} />
              Preview
            </button>
            <button
              type="submit"
              form="post-form"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-4 -mb-4">
          {['content', 'settings', 'seo'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <form id="post-form" onSubmit={handleSubmit} className="flex-1">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Title and Slug */}
              <div className="bg-white p-6 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter post title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleSlugChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="post-url-slug"
                    />
                    {errors.slug && (
                      <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your post"
                    />
                  </div>
                </div>
              </div>

              {/* Block Editor */}
              {activeTab === 'content' && (
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Content</h2>
                    <button
                      type="button"
                      onClick={() => setShowBlockModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={18} />
                      Add Block
                    </button>
                  </div>

                  <BlockRenderer
                    blocks={formData.blocks}
                    onUpdateBlock={handleBlockUpdate}
                    onRemoveBlock={handleBlockRemove}
                    onDuplicateBlock={handleBlockDuplicate}
                    selectedBlock={selectedBlock}
                    onSelectBlock={setSelectedBlock}
                  />

                  {formData.blocks.length === 0 && (
                    <BlockButton onClick={() => setShowBlockModal(true)} />
                  )}
                </div>
              )}

              {/* Settings Tab Content */}
              {activeTab === 'settings' && (
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Post Settings</h2>
                  {/* Settings content would go here */}
                </div>
              )}

              {/* SEO Tab Content */}
              {activeTab === 'seo' && (
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">SEO Settings</h2>
                  {/* SEO content would go here */}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {renderSidebar()}
            </div>
          </div>
        </div>
      </form>

      {/* Block Modal */}
      <BlockModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        onInsertBlock={handleInsertBlock}
      />
    </div>
  );
};

export default PostForm;