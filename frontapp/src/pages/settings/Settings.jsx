import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Upload, 
  Download,
  Trash2,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Users,
  Shield,
  Bell,
  Palette,
  Database,
  Code,
  Server,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Edit,        // Added Edit icon
  Link,        // Added Link icon
  Image        // Added Image icon (was also missing)
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showSecret, setShowSecret] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteTitle: '',
    siteDescription: '',
    siteUrl: '',
    adminEmail: '',
    timezone: '',
    dateFormat: '',
    timeFormat: '',

    // Writing Settings
    defaultCategory: '',
    defaultPostStatus: 'draft',
    defaultCommentStatus: 'open',

    // Reading Settings
    frontPageDisplay: 'posts',
    frontPage: '',
    postsPage: '',
    postsPerPage: 10,
    postsPerRss: 10,

    // Discussion Settings
    allowComments: true,
    commentModeration: false,
    commentApproval: true,
    commentBlacklist: '',

    // Media Settings
    thumbnailSize: '150x150',
    mediumSize: '300x300',
    largeSize: '1024x1024',
    uploadsOrganize: true,

    // Permalink Settings
    permalinkStructure: 'postname',

    // Email Settings
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',

    // Advanced Settings
    debugMode: false,
    maintenanceMode: false,
    apiEnabled: true,
    cacheEnabled: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Simulate API call to Django backend
      setTimeout(() => {
        const mockSettings = {
          siteTitle: 'My Django CMS',
          siteDescription: 'A modern content management system',
          siteUrl: 'https://mycms.example.com',
          adminEmail: 'admin@example.com',
          timezone: 'UTC',
          dateFormat: 'F j, Y',
          timeFormat: 'g:i a',
          defaultCategory: 'uncategorized',
          defaultPostStatus: 'draft',
          defaultCommentStatus: 'open',
          frontPageDisplay: 'posts',
          frontPage: '',
          postsPage: '',
          postsPerPage: 10,
          postsPerRss: 10,
          allowComments: true,
          commentModeration: false,
          commentApproval: true,
          commentBlacklist: '',
          thumbnailSize: '150x150',
          mediumSize: '300x300',
          largeSize: '1024x1024',
          uploadsOrganize: true,
          permalinkStructure: 'postname',
          smtpHost: '',
          smtpPort: '587',
          smtpUsername: '',
          smtpPassword: '',
          smtpEncryption: 'tls',
          debugMode: false,
          maintenanceMode: false,
          apiEnabled: true,
          cacheEnabled: true
        };
        setSettings(mockSettings);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus(null);

    try {
      // API call to save settings
      // await api.post('/api/settings/', settings);
      setTimeout(() => {
        setSaving(false);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      }, 1000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaving(false);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'cms-settings.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
        } catch (error) {
          console.error('Error parsing settings file:', error);
          alert('Invalid settings file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
      setSettings({
        siteTitle: 'My Django CMS',
        siteDescription: 'A modern content management system',
        siteUrl: 'https://mycms.example.com',
        adminEmail: 'admin@example.com',
        timezone: 'UTC',
        dateFormat: 'F j, Y',
        timeFormat: 'g:i a',
        defaultCategory: 'uncategorized',
        defaultPostStatus: 'draft',
        defaultCommentStatus: 'open',
        frontPageDisplay: 'posts',
        frontPage: '',
        postsPage: '',
        postsPerPage: 10,
        postsPerRss: 10,
        allowComments: true,
        commentModeration: false,
        commentApproval: true,
        commentBlacklist: '',
        thumbnailSize: '150x150',
        mediumSize: '300x300',
        largeSize: '1024x1024',
        uploadsOrganize: true,
        permalinkStructure: 'postname',
        smtpHost: '',
        smtpPort: '587',
        smtpUsername: '',
        smtpPassword: '',
        smtpEncryption: 'tls',
        debugMode: false,
        maintenanceMode: false,
        apiEnabled: true,
        cacheEnabled: true
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'writing', label: 'Writing', icon: Edit },
    { id: 'reading', label: 'Reading', icon: Eye },
    { id: 'discussion', label: 'Discussion', icon: Users },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'permalinks', label: 'Permalinks', icon: Link },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'advanced', label: 'Advanced', icon: Code }
  ];

  const timezones = [
    'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
    'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney'
  ];

  const categories = [
    'uncategorized', 'news', 'blog', 'updates', 'events'
  ];

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-header">
          <h1>Settings</h1>
          <div className="shimmer" style={{ width: '200px', height: '40px' }}></div>
        </div>
        
        <div className="settings-content loading">
          <div className="settings-tabs">
            {tabs.map(tab => (
              <div key={tab.id} className="tab-shimmer"></div>
            ))}
          </div>
          
          <div className="settings-form">
            <div className="form-shimmer">
              {[1, 2, 3, 4, 5].map(item => (
                <div key={item} className="shimmer" style={{ height: '40px', marginBottom: '16px' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
          <label className="btn btn-secondary">
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          <button className="btn btn-danger" onClick={handleReset}>
            <Trash2 size={16} />
            Reset
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <RefreshCw size={16} className="spinning" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className={`save-status ${saveStatus}`}>
          {saveStatus === 'success' ? (
            <>
              <CheckCircle size={16} />
              Settings saved successfully!
            </>
          ) : (
            <>
              <AlertCircle size={16} />
              Error saving settings. Please try again.
            </>
          )}
        </div>
      )}

      <div className="settings-content">
        <div className="settings-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <form className="settings-form" onSubmit={handleSave}>
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>Site Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="siteTitle">Site Title</label>
                    <input
                      type="text"
                      id="siteTitle"
                      name="siteTitle"
                      value={settings.siteTitle}
                      onChange={handleInputChange}
                      placeholder="My Awesome Site"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="siteDescription">Site Description</label>
                    <textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleInputChange}
                      placeholder="A brief description of your site"
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="siteUrl">Site URL</label>
                    <input
                      type="url"
                      id="siteUrl"
                      name="siteUrl"
                      value={settings.siteUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="adminEmail">Admin Email</label>
                    <input
                      type="email"
                      id="adminEmail"
                      name="adminEmail"
                      value={settings.adminEmail}
                      onChange={handleInputChange}
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Date & Time</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="timezone">Timezone</label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleInputChange}
                    >
                      {timezones.map(tz => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateFormat">Date Format</label>
                    <input
                      type="text"
                      id="dateFormat"
                      name="dateFormat"
                      value={settings.dateFormat}
                      onChange={handleInputChange}
                      placeholder="F j, Y"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="timeFormat">Time Format</label>
                    <input
                      type="text"
                      id="timeFormat"
                      name="timeFormat"
                      value={settings.timeFormat}
                      onChange={handleInputChange}
                      placeholder="g:i a"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Writing Settings */}
          {activeTab === 'writing' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>Default Post Settings</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="defaultCategory">Default Category</label>
                    <select
                      id="defaultCategory"
                      name="defaultCategory"
                      value={settings.defaultCategory}
                      onChange={handleInputChange}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="defaultPostStatus">Default Post Status</label>
                    <select
                      id="defaultPostStatus"
                      name="defaultPostStatus"
                      value={settings.defaultPostStatus}
                      onChange={handleInputChange}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="defaultCommentStatus">Default Comment Status</label>
                    <select
                      id="defaultCommentStatus"
                      name="defaultCommentStatus"
                      value={settings.defaultCommentStatus}
                      onChange={handleInputChange}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reading Settings */}
          {activeTab === 'reading' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>Front Page Display</h3>
                <div className="form-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="frontPageDisplay"
                      value="posts"
                      checked={settings.frontPageDisplay === 'posts'}
                      onChange={handleInputChange}
                    />
                    <span>Your latest posts</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="frontPageDisplay"
                      value="page"
                      checked={settings.frontPageDisplay === 'page'}
                      onChange={handleInputChange}
                    />
                    <span>A static page</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h3>Blog Pages</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="postsPerPage">Blog pages show at most</label>
                    <input
                      type="number"
                      id="postsPerPage"
                      name="postsPerPage"
                      value={settings.postsPerPage}
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                    />
                    <span className="help-text">posts</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="postsPerRss">Syndication feeds show the most recent</label>
                    <input
                      type="number"
                      id="postsPerRss"
                      name="postsPerRss"
                      value={settings.postsPerRss}
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                    />
                    <span className="help-text">posts</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discussion Settings */}
          {activeTab === 'discussion' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>Default Comment Settings</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="allowComments"
                      checked={settings.allowComments}
                      onChange={handleInputChange}
                    />
                    <span>Allow people to submit comments on new posts</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="commentModeration"
                      checked={settings.commentModeration}
                      onChange={handleInputChange}
                    />
                    <span>Comment must be manually approved</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h3>Comment Moderation</h3>
                <div className="form-group">
                  <label htmlFor="commentBlacklist">Comment Blacklist</label>
                  <textarea
                    id="commentBlacklist"
                    name="commentBlacklist"
                    value={settings.commentBlacklist}
                    onChange={handleInputChange}
                    placeholder="Enter words or IP addresses (one per line)"
                    rows={4}
                  />
                  <span className="help-text">Comments containing these words or IP addresses will be held for moderation</span>
                </div>
              </div>
            </div>
          )}

          {/* Media Settings */}
          {activeTab === 'media' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>Image Sizes</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="thumbnailSize">Thumbnail Size</label>
                    <input
                      type="text"
                      id="thumbnailSize"
                      name="thumbnailSize"
                      value={settings.thumbnailSize}
                      onChange={handleInputChange}
                      placeholder="150x150"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mediumSize">Medium Size</label>
                    <input
                      type="text"
                      id="mediumSize"
                      name="mediumSize"
                      value={settings.mediumSize}
                      onChange={handleInputChange}
                      placeholder="300x300"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="largeSize">Large Size</label>
                    <input
                      type="text"
                      id="largeSize"
                      name="largeSize"
                      value={settings.largeSize}
                      onChange={handleInputChange}
                      placeholder="1024x1024"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Uploading Files</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="uploadsOrganize"
                      checked={settings.uploadsOrganize}
                      onChange={handleInputChange}
                    />
                    <span>Organize my uploads into month- and year-based folders</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Permalink Settings */}
          {activeTab === 'permalinks' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>Common Settings</h3>
                <div className="form-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="permalinkStructure"
                      value="plain"
                      checked={settings.permalinkStructure === 'plain'}
                      onChange={handleInputChange}
                    />
                    <span>Plain</span>
                    <code className="permalink-example">/?p=123</code>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="permalinkStructure"
                      value="day-name"
                      checked={settings.permalinkStructure === 'day-name'}
                      onChange={handleInputChange}
                    />
                    <span>Day and name</span>
                    <code className="permalink-example">/2023/10/15/sample-post/</code>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="permalinkStructure"
                      value="month-name"
                      checked={settings.permalinkStructure === 'month-name'}
                      onChange={handleInputChange}
                    />
                    <span>Month and name</span>
                    <code className="permalink-example">/2023/10/sample-post/</code>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="permalinkStructure"
                      value="numeric"
                      checked={settings.permalinkStructure === 'numeric'}
                      onChange={handleInputChange}
                    />
                    <span>Numeric</span>
                    <code className="permalink-example">/archives/123</code>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="permalinkStructure"
                      value="postname"
                      checked={settings.permalinkStructure === 'postname'}
                      onChange={handleInputChange}
                    />
                    <span>Post name</span>
                    <code className="permalink-example">/sample-post/</code>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>SMTP Settings</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="smtpHost">SMTP Host</label>
                    <input
                      type="text"
                      id="smtpHost"
                      name="smtpHost"
                      value={settings.smtpHost}
                      onChange={handleInputChange}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="smtpPort">SMTP Port</label>
                    <input
                      type="number"
                      id="smtpPort"
                      name="smtpPort"
                      value={settings.smtpPort}
                      onChange={handleInputChange}
                      placeholder="587"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="smtpUsername">SMTP Username</label>
                    <input
                      type="text"
                      id="smtpUsername"
                      name="smtpUsername"
                      value={settings.smtpUsername}
                      onChange={handleInputChange}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="smtpPassword">SMTP Password</label>
                    <div className="password-input">
                      <input
                        type={showSecret ? "text" : "password"}
                        id="smtpPassword"
                        name="smtpPassword"
                        value={settings.smtpPassword}
                        onChange={handleInputChange}
                        placeholder="Your password"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowSecret(!showSecret)}
                      >
                        {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="smtpEncryption">Encryption</label>
                    <select
                      id="smtpEncryption"
                      name="smtpEncryption"
                      value={settings.smtpEncryption}
                      onChange={handleInputChange}
                    >
                      <option value="none">None</option>
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <div className="tab-content">
              <div className="form-section">
                <h3>System Settings</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="debugMode"
                      checked={settings.debugMode}
                      onChange={handleInputChange}
                    />
                    <span>Debug Mode</span>
                    <span className="help-text">Show detailed error messages (not recommended for production)</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleInputChange}
                    />
                    <span>Maintenance Mode</span>
                    <span className="help-text">Show maintenance page to visitors</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="apiEnabled"
                      checked={settings.apiEnabled}
                      onChange={handleInputChange}
                    />
                    <span>Enable REST API</span>
                    <span className="help-text">Allow access to the REST API</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="cacheEnabled"
                      checked={settings.cacheEnabled}
                      onChange={handleInputChange}
                    />
                    <span>Enable Caching</span>
                    <span className="help-text">Improve performance with caching</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? <RefreshCw size={16} className="spinning" /> : <Save size={16} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;