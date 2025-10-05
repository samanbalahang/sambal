import React from 'react';
import { Move, Trash2, Settings, Quote } from 'lucide-react';

const QuoteBlock = ({ block, onUpdate, onRemove, isSelected, onSelect }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...block,
      data: { ...block.data, [field]: value }
    });
  };

  return (
    <div 
      className={`block-wrapper relative border-2 rounded-lg p-4 mb-4 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-300'}`}
      onClick={onSelect}
    >
      <div className={`block-toolbar absolute -top-3 right-2 bg-white shadow-md rounded-lg p-1 flex gap-1 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
        <button className="toolbar-btn p-1 hover:bg-gray-100 rounded">
          <Move size={14} />
        </button>
        <button className="toolbar-btn p-1 hover:bg-gray-100 rounded" onClick={() => onRemove(block.id)}>
          <Trash2 size={14} />
        </button>
        <button className="toolbar-btn p-1 hover:bg-gray-100 rounded">
          <Settings size={14} />
        </button>
      </div>

      <div className="border-l-4 border-gray-300 pl-4">
        <textarea
          value={block.data.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full p-2 border rounded resize-y min-h-20 italic focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your quote here..."
        />
        
        <input
          type="text"
          value={block.data.author}
          onChange={(e) => handleChange('author', e.target.value)}
          className="w-full mt-2 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Author (optional)"
        />
      </div>
    </div>
  );
};

export default QuoteBlock;