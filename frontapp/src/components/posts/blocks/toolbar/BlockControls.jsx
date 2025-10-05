import React from 'react';
import { Move, Trash2, Copy, Settings, ChevronUp, ChevronDown } from 'lucide-react';

const BlockControls = ({ 
  blockId, 
  onMoveUp, 
  onMoveDown, 
  onDuplicate, 
  onRemove, 
  onSettings,
  isFirst = false,
  isLast = false,
  position = 'top'
}) => {
  return (
    <div className={`block-controls absolute ${position === 'top' ? '-top-3' : '-bottom-3'} right-2 bg-white shadow-md rounded-lg p-1 flex gap-1 z-10`}>
      <button
        onClick={onMoveUp}
        disabled={isFirst}
        className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        title="Move up"
      >
        <ChevronUp size={14} />
      </button>
      
      <button
        onClick={onMoveDown}
        disabled={isLast}
        className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        title="Move down"
      >
        <ChevronDown size={14} />
      </button>
      
      <div className="w-px bg-gray-300 mx-1"></div>
      
      <button
        onClick={onDuplicate}
        className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        title="Duplicate"
      >
        <Copy size={14} />
      </button>
      
      <button
        onClick={onSettings}
        className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        title="Settings"
      >
        <Settings size={14} />
      </button>
      
      <div className="w-px bg-gray-300 mx-1"></div>
      
      <button
        onClick={onRemove}
        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default BlockControls;