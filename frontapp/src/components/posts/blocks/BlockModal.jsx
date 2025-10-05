import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Heading, 
  Pilcrow, 
  Image, 
  Square, 
  Quote, 
  Play, 
  Type, 
  Layout,
  Grid
} from 'lucide-react';

// Block type definitions (can be moved to separate file if needed)
const blockTypes = {
  heading: {
    name: 'Heading',
    icon: Heading,
    category: 'text',
    description: 'Add a heading section'
  },
  text: {
    name: 'Text',
    icon: Pilcrow,
    category: 'text',
    description: 'Add a text paragraph'
  },
  image: {
    name: 'Image',
    icon: Image,
    category: 'media',
    description: 'Add an image'
  },
  button: {
    name: 'Button',
    icon: Square,
    category: 'design',
    description: 'Add a button'
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
    description: 'Add a video'
  }
};

const blockCategories = [
  { id: 'all', name: 'All Blocks', icon: Grid },
  { id: 'text', name: 'Text', icon: Type },
  { id: 'media', name: 'Media', icon: Image },
  { id: 'design', name: 'Design', icon: Layout }
];

const BlockModal = ({ isOpen, onClose, onInsertBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const getIconComponent = (IconComponent, size = 18) => {
    return <IconComponent size={size} />;
  };

  const filteredBlocks = Object.entries(blockTypes).filter(([key, block]) => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBlockInsert = (blockType) => {
    onInsertBlock(blockType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Add a Block</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blockCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {getIconComponent(category.icon, 16)}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {filteredBlocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Search size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No blocks found</h3>
              <p className="text-gray-500">
                {searchTerm ? `No results for "${searchTerm}"` : 'No blocks available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {filteredBlocks.map(([key, block]) => {
                const IconComponent = block.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleBlockInsert(key)}
                    className="group p-4 text-left rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {block.name}
                        </h4>
                        <p className="text-sm text-gray-500">{block.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 flex-1">
                      {block.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Add Block →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {filteredBlocks.length} {filteredBlocks.length === 1 ? 'block' : 'blocks'} found
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;