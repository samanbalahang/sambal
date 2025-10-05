import React from 'react';
import { Move, Trash2, Settings } from 'lucide-react';

const TextBlock = ({ block, onUpdate, onRemove, isSelected, onSelect }) => {
  const handleChange = (value) => {
    onUpdate({
      ...block,
      data: { ...block.data, content: value }
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

      <textarea
        value={block.data.content}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full p-3 border rounded resize-y min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your text content..."
      />
    </div>
  );
};

export default TextBlock;