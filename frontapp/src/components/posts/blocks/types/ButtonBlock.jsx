import React from 'react';
import { Move, Trash2, Settings, Square } from 'lucide-react';

const ButtonBlock = ({ block, onUpdate, onRemove, isSelected, onSelect, isReadOnly }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...block,
      data: { ...block.data, [field]: value }
    });
  };

  return (
    <div 
      className={`block-container relative border-2 rounded-lg p-4 mb-4 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-300'}`}
      onClick={onSelect}
    >
      {!isReadOnly && (
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
      )}

      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <Square size={16} className="text-gray-400" />
          <span className="text-sm font-medium">Button Block</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={block.data.text || ''}
            onChange={(e) => handleChange('text', e.target.value)}
            placeholder="Button text"
            className="flex-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isReadOnly}
          />
          
          <input
            type="url"
            value={block.data.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
            placeholder="Button URL"
            className="flex-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isReadOnly}
          />
        </div>

        <select
          value={block.data.variant || 'primary'}
          onChange={(e) => handleChange('variant', e.target.value)}
          className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isReadOnly}
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
          <option value="ghost">Ghost</option>
        </select>

        {!isReadOnly && (
          <div className="pt-2">
            <button className={`px-4 py-2 rounded text-sm font-medium ${
              block.data.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' :
              block.data.variant === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' :
              block.data.variant === 'outline' ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' :
              'text-gray-700 hover:bg-gray-100'
            }`}>
              {block.data.text || 'Button Preview'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonBlock;