import React, { useState } from 'react';
import { 
  Plus, 
  Type, 
  Image, 
  Layout, 
  Quote, 
  Square, 
  Play,
  ChevronDown,
  Search,
  X
} from 'lucide-react';

// Block categories and types
const blockCategories = [
  { id: 'mostUsed', name: 'Most Used', icon: Layout },
  { id: 'text', name: 'Text', icon: Type },
  { id: 'media', name: 'Media', icon: Image },
  { id: 'design', name: 'Design', icon: Layout }
];

const blockTypes = {
  heading: {
    name: 'Heading',
    icon: Type,
    category: 'text',
    description: 'Add heading text'
  },
  paragraph: {
    name: 'Paragraph',
    icon: Type,
    category: 'text',
    description: 'Add text content'
  },
  image: {
    name: 'Image',
    icon: Image,
    category: 'media',
    description: 'Insert an image'
  },
  gallery: {
    name: 'Gallery',
    icon: Image,
    category: 'media',
    description: 'Create an image gallery'
  },
  button: {
    name: 'Button',
    icon: Square,
    category: 'design',
    description: 'Add a button'
  },
  spacer: {
    name: 'Spacer',
    icon: Square,
    category: 'design',
    description: 'Add empty space'
  },
  quote: {
    name: 'Quote',
    icon: Quote,
    category: 'text',
    description: 'Add a quote block'
  },
  video: {
    name: 'Video',
    icon: Play,
    category: 'media',
    description: 'Embed a video'
  }
};

const InserterToolbar = ({ onInsertBlock, position = 'top' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('mostUsed');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInsert = (blockType) => {
    onInsertBlock(blockType);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredBlocks = Object.entries(blockTypes).filter(([key, block]) => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'mostUsed' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBlocks = (categoryId) => {
    return Object.entries(blockTypes).filter(([key, block]) => {
      return block.category === categoryId;
    });
  };

  const mostUsedBlocks = ['paragraph', 'image', 'heading', 'button'];

  return (
    <div className="relative">
      {/* Main Toolbar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
          bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg
          border border-blue-700
        `}
        aria-label="Add block"
      >
        <Plus size={18} />
        <span>Add Block</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className={`
          absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} 
          left-0 z-50 w-96 bg-white rounded-lg shadow-xl border border-gray-200
          animate-in fade-in-90 zoom-in-95
        `}>
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Add a Block</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>
          </div>

          {/* Categories */}
          {!searchTerm && (
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex gap-1 overflow-x-auto">
                {blockCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap
                      transition-colors duration-200
                      ${selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    <category.icon size={14} />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blocks List */}
          <div className="max-h-64 overflow-y-auto p-2">
            {filteredBlocks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No blocks found</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredBlocks.map(([key, block]) => {
                  const IconComponent = block.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleInsert(key)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <IconComponent size={16} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {block.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {block.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Access Section (when no search) */}
          {!searchTerm && selectedCategory === 'mostUsed' && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Quick Access
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {mostUsedBlocks.slice(0, 4).map(blockKey => {
                  const block = blockTypes[blockKey];
                  if (!block) return null;
                  const IconComponent = block.icon;
                  return (
                    <button
                      key={blockKey}
                      onClick={() => handleInsert(blockKey)}
                      className="flex items-center gap-2 p-2 text-xs bg-white border border-gray-200 rounded-md hover:border-blue-300 hover:text-blue-600 transition-colors"
                    >
                      <IconComponent size={12} />
                      {block.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default InserterToolbar;