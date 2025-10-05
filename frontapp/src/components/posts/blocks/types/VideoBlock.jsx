import React from 'react';
import { Move, Trash2, Settings, Play, Upload } from 'lucide-react';

const VideoBlock = ({ block, onUpdate, onRemove, isSelected, onSelect }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...block,
      data: { ...block.data, [field]: value }
    });
  };

  const getYouTubeId = (url) => {
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isYouTube = block.data.url.includes('youtube.com') || block.data.url.includes('youtu.be');

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
            {isYouTube ? (
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(block.data.url)}`}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-black rounded-lg flex items-center justify-center">
                <video src={block.data.url} controls className="w-full h-full" />
                <Play size={48} className="absolute text-white opacity-70" />
              </div>
            )}
            <button
              onClick={() => handleChange('url', '')}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 mb-2">Paste a YouTube URL or upload a video</p>
            <input
              type="text"
              value={block.data.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full p-2 border rounded text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500">Or</p>
            <label className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
              Upload Video
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    handleChange('url', url);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        )}

        <input
          type="text"
          value={block.data.caption}
          onChange={(e) => handleChange('caption', e.target.value)}
          placeholder="Video caption (optional)"
          className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default VideoBlock;