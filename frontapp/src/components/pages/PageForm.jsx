import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Image, 
  Link, 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Eye,
  Calendar,
  Code,
  ExternalLink
} from 'lucide-react';

const PageForm = ({ page, onSave, onClose, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
    template: 'default',
    parent: '',
    menuOrder: 0,
    isHomepage: false,
    allowComments: false
  });

  const [errors, setErrors] = useState({});
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [showSlugHelp, setShowSlugHelp] = useState(false);

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        excerpt: page.excerpt || '',
        status: page.status || 'draft',
        featuredImage: page.featuredImage || '',
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        template: page.template || 'default',
        parent: page.parent || '',
        menuOrder: page.menuOrder || 0,
        isHomepage: page.isHomepage || false,
        allowComments: page.allowComments || false
      });
      setIsSlugManual(!!page.slug);
    }
  }, [page]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title if not manually edited
    if (name === 'title' && !isSlugManual) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSlugChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      slug: value
    }));
    setIsSlugManual(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    const previewData = {
      ...formData,
      id: page?.id || 'new'
    };
    console.log('Preview data:', previewData);
    // window.open(`/preview/page/${previewData.id}`, '_blank');
  };

  const handleInsertShortcode = (shortcode) => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = formData.content.substring(0, start) + shortcode + formData.content.substring(end);
    
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));

    // Set cursor position after inserted shortcode
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + shortcode.length, start + shortcode.length);
    }, 0);
  };

  const templateOptions = [
    { value: 'default', label: 'Default Template' },
    { value: 'full-width', label: 'Full Width' },
    { value: 'sidebar-left', label: 'Sidebar Left' },
    { value: 'sidebar-right', label: 'Sidebar Right' },
    { value: 'landing', label: 'Landing Page' }
  ];

  const parentPageOptions = [
    { value: '', label: 'No Parent' },
    { value: 'home', label: 'Home' },
    { value: 'about', label: 'About Us' },
    { value: 'services', label: 'Services' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal page-form-modal">
        <div className="modal-header">
          <h2>{page ? 'Edit Page' : 'Create New Page'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="page-form">
          <div className="form-content">
            <div className="form-main">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="Enter page title"
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="slug">
                  Slug *
                  <button
                    type="button"
                    className="help-btn"
                    onClick={() => setShowSlugHelp(!showSlugHelp)}
                    title="What is a slug?"
                  >
                    ?
                  </button>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  className={errors.slug ? 'error' : ''}
                  placeholder="page-url-slug"
                />
                {errors.slug && <span className="error-text">{errors.slug}</span>}
                {showSlugHelp && (
                  <div className="help-text">
                    The slug is the URL-friendly version of the title. It should contain only lowercase letters, numbers, and hyphens.
                    Example: "About Us" becomes "about-us"
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <div className="editor-toolbar">
                  <div className="toolbar-group">
                    <button type="button" className="toolbar-btn" title="Bold">
                      <Bold size={16} />
                    </button>
                    <button type="button" className="toolbar-btn" title="Italic">
                      <Italic size={16} />
                    </button>
                  </div>
                  <div className="toolbar-group">
                    <button type="button" className="toolbar-btn" title="Unordered List">
                      <List size={16} />
                    </button>
                    <button type="button" className="toolbar-btn" title="Ordered List">
                      <ListOrdered size={16} />
                    </button>
                  </div>
                  <div className="toolbar-group">
                    <button type="button" className="toolbar-btn" title="Insert Link">
                      <Link size={16} />
                    </button>
                    <button type="button" className="toolbar-btn" title="Insert Image">
                      <Image size={16} />
                    </button>
                  </div>
                  <div className="toolbar-group">
                    <div className="shortcode-dropdown">
                      <button type="button" className="toolbar-btn" title="Shortcodes">
                        <Code size={16} />
                      </button>
                      <div className="shortcode-menu">
                        <button type="button" onClick={() => handleInsertShortcode('[contact-form]')}>
                          Contact Form
                        </button>
                        <button type="button" onClick={() => handleInsertShortcode('[gallery]')}>
                          Gallery
                        </button>
                        <button type="button" onClick={() => handleInsertShortcode('[map]')}>
                          Map
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className={errors.content ? 'error' : ''}
                  placeholder="Write your page content here..."
                  rows={12}
                />
                {errors.content && <span className="error-text">{errors.content}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of the page (optional)"
                  rows={3}
                />
                <div className="help-text">
                  A short summary of the page. If omitted, it will be auto-generated from the content.
                </div>
              </div>
            </div>

            <div className="form-sidebar">
              <div className="form-section">
                <h3>Publish</h3>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="template">Template</label>
                  <select
                    id="template"
                    name="template"
                    value={formData.template}
                    onChange={handleInputChange}
                  >
                    {templateOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="parent">Parent Page</label>
                  <select
                    id="parent"
                    name="parent"
                    value={formData.parent}
                    onChange={handleInputChange}
                  >
                    {parentPageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="menuOrder">Menu Order</label>
                  <input
                    type="number"
                    id="menuOrder"
                    name="menuOrder"
                    value={formData.menuOrder}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isHomepage"
                      checked={formData.isHomepage}
                      onChange={handleInputChange}
                    />
                    <span>Set as homepage</span>
                  </label>
                </div>

                <div className="form-checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="allowComments"
                      checked={formData.allowComments}
                      onChange={handleInputChange}
                    />
                    <span>Allow comments</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePreview}
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    <Save size={16} />
                    {loading ? 'Saving...' : (page ? 'Update' : 'Publish')}
                  </button>
                </div>
              </div>

              <div className="form-section">
                <h3>Featured Image</h3>
                <div className="featured-image-upload">
                  {formData.featuredImage ? (
                    <div className="image-preview">
                      <img src={formData.featuredImage} alt="Featured" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <Image size={32} />
                      <span>Set featured image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setFormData(prev => ({
                                ...prev,
                                featuredImage: e.target.result
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h3>SEO Settings</h3>
                <div className="form-group">
                  <label htmlFor="metaTitle">Meta Title</label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="SEO title (optional)"
                  />
                  <div className="help-text">
                    {formData.metaTitle.length}/60 characters
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="metaDescription">Meta Description</label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    placeholder="SEO description (optional)"
                    rows={3}
                  />
                  <div className="help-text">
                    {formData.metaDescription.length}/160 characters
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageForm;