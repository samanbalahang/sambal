import React from 'react';
import { Move, Trash2, Settings, Upload, Image as ImageIcon } from 'lucide-react';

const ImageBlock = ({ block, onUpdate, onRemove, isSelected, onSelect }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...block,
      data: { ...block.data, [field]: value }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('url', e.target.result);
      };
      reader.readAsDataURL(file);
    }
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

      <div className="space-y-3">
        {block.data.url ? (
          <div className="relative">
            <img
              src={block.data.url}
              alt={block.data.alt}
              className="w-full rounded-lg border"
            />
            <button
              onClick={() => handleChange('url', '')}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : (
          <label className="block p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <span className="text-gray-600">Click to upload image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}

        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            value={block.data.alt}
            onChange={(e) => handleChange('alt', e.target.value)}
            placeholder="Alt text (for accessibility)"
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={block.data.caption}
            onChange={(e) => handleChange('caption', e.target.value)}
            placeholder="Caption (optional)"
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageBlock;