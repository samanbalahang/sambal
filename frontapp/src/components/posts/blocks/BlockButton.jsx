import React from 'react';
import { Plus } from 'lucide-react';

const BlockButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors mb-4"
    >
      <Plus size={24} className="mb-1" />
      <span className="text-sm font-medium">Add Block</span>
    </button>
  );
};

export default BlockButton;