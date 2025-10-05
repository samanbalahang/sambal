import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

const PostList = ({ posts, onEdit, onDelete, onView, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { class: 'status-published', text: 'Published' },
      draft: { class: 'status-draft', text: 'Draft' },
      archived: { class: 'status-archived', text: 'Archived' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="post-list">
        <div className="post-list-header">
          <div className="shimmer" style={{ width: '200px', height: '24px' }}></div>
          <div className="shimmer" style={{ width: '120px', height: '36px' }}></div>
        </div>
        
        <div className="post-list-filters">
          <div className="shimmer" style={{ width: '250px', height: '40px' }}></div>
          <div className="shimmer" style={{ width: '150px', height: '40px' }}></div>
        </div>
        
        <div className="posts-table">
          <div className="table-header">
            {['Title', 'Author', 'Status', 'Date', 'Actions'].map((_, index) => (
              <div key={index} className="shimmer" style={{ height: '20px' }}></div>
            ))}
          </div>
          
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="table-row loading">
              {[1, 2, 3, 4, 5].map((cell) => (
                <div key={cell} className="shimmer" style={{ height: '16px' }}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h2>Posts ({filteredPosts.length})</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => onEdit(null)}>
            <FileText size={16} />
            Add New Post
          </button>
        </div>
      </div>

      <div className="post-list-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="filter-select"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
          
          <button 
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button className="btn btn-primary" onClick={() => onEdit(null)}>
            Create Your First Post
          </button>
        </div>
      ) : (
        <>
          <div className="posts-table">
            <div className="table-header">
              <div className="header-cell" onClick={() => handleSort('title')}>
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </div>
              <div className="header-cell">Author</div>
              <div className="header-cell">Status</div>
              <div className="header-cell" onClick={() => handleSort('date')}>
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </div>
              <div className="header-cell">Actions</div>
            </div>

            {currentPosts.map((post) => (
              <div key={post.id} className="table-row">
                <div className="table-cell">
                  <div className="post-title">
                    <span className="title-text">{post.title}</span>
                    {post.featured && <span className="featured-badge">Featured</span>}
                  </div>
                </div>
                <div className="table-cell">
                  <div className="author-cell">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>
                <div className="table-cell">
                  {getStatusBadge(post.status)}
                </div>
                <div className="table-cell">
                  <div className="date-cell">
                    <Calendar size={14} />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <div className="table-cell">
                  <div className="action-buttons">
                    <button 
                      className="icon-btn view-btn"
                      onClick={() => onView && onView(post)}
                      title="View Post"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="icon-btn edit-btn"
                      onClick={() => onEdit(post)}
                      title="Edit Post"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="icon-btn delete-btn"
                      onClick={() => onDelete(post.id)}
                      title="Delete Post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;