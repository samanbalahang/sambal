import React from 'react';
import { Move, Trash2, Settings } from 'lucide-react';

const HeadingBlock = ({ block, onUpdate, onRemove, isSelected, onSelect }) => {
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

      <div className="mb-2">
        <select
          value={block.data.level}
          onChange={(e) => handleChange('level', e.target.value)}
          className="text-xs p-1 border rounded"
        >
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>
      </div>

      <input
        type="text"
        value={block.data.content}
        onChange={(e) => handleChange('content', e.target.value)}
        className="w-full p-2 border rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter heading text..."
        style={{ 
          fontSize: block.data.level === 'h1' ? '2em' : 
                   block.data.level === 'h2' ? '1.5em' : 
                   block.data.level === 'h3' ? '1.17em' : '1em' 
        }}
      />
    </div>
  );
};

export default HeadingBlock;