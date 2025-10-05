import React from 'react';
import {
  HeadingBlock,
  TextBlock,
  ImageBlock,
  QuoteBlock,
  VideoBlock,
  ButtonBlock
} from './types/blockTypes';
import { Type } from 'lucide-react'; // or wherever the Type icon is coming from
const BlockRenderer = ({ 
  blocks, 
  onUpdateBlock, 
  onRemoveBlock, 
  onDuplicateBlock,
  onMoveBlock,
  selectedBlock, 
  onSelectBlock,
  onAddBlockAfter,
  isReadOnly = false
}) => {
  const handleBlockUpdate = (blockId, newData) => {
    onUpdateBlock(blockId, newData);
  };

  const handleBlockRemove = (blockId) => {
    onRemoveBlock(blockId);
  };

  const handleBlockDuplicate = (blockId) => {
    onDuplicateBlock(blockId);
  };

  const handleBlockMove = (blockId, direction) => {
    onMoveBlock(blockId, direction);
  };

  const handleAddBlockAfter = (blockId, blockType) => {
    onAddBlockAfter(blockId, blockType);
  };

  const renderBlock = (block, index) => {
    const blockProps = {
      block,
      onUpdate: (newData) => handleBlockUpdate(block.id, newData),
      onRemove: () => handleBlockRemove(block.id),
      onDuplicate: () => handleBlockDuplicate(block.id),
      onMove: (direction) => handleBlockMove(block.id, direction),
      onAddAfter: (blockType) => handleAddBlockAfter(block.id, blockType),
      isSelected: selectedBlock === block.id,
      onSelect: () => onSelectBlock(block.id),
      isFirst: index === 0,
      isLast: index === blocks.length - 1,
      isReadOnly
    };

    switch (block.type) {
      case 'heading':
        return <HeadingBlock key={block.id} {...blockProps} />;
      case 'text':
        return <TextBlock key={block.id} {...blockProps} />;
      case 'image':
        return <ImageBlock key={block.id} {...blockProps} />;
      case 'quote':
        return <QuoteBlock key={block.id} {...blockProps} />;
      case 'video':
        return <VideoBlock key={block.id} {...blockProps} />;
      case 'button':
        return <ButtonBlock key={block.id} {...blockProps} />;
      default:
        return (
          <div key={block.id} className="block-unknown p-4 border border-red-300 bg-red-50 rounded-lg">
            <p className="text-red-600">Unknown block type: {block.type}</p>
          </div>
        );
    }
  };

  const renderBlockSeparator = (index) => {
    if (isReadOnly) return null;

    return (
      <div 
        key={`separator-${index}`}
        className="block-separator h-8 flex items-center justify-center relative group"
        onClick={() => onAddBlockAfter(blocks[index].id, 'text')}
      >
        <div className="w-full h-px bg-gray-200 group-hover:bg-blue-300 transition-colors"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors">
            <PlusIcon size={16} />
          </button>
        </div>
      </div>
    );
  };

  if (!blocks || blocks.length === 0) {
    return (
      <div className="block-renderer-empty text-center py-12 px-4">
        <div className="text-gray-400 mb-4">
          <Type size={48} className="mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No blocks yet</h3>
        <p className="text-gray-500">Start by adding your first content block</p>
      </div>
    );
  }

  return (
    <div className="block-renderer space-y-6">
      {blocks.map((block, index) => (
        <React.Fragment key={block.id}>
          {renderBlock(block, index)}
          {index < blocks.length - 1 && renderBlockSeparator(index)}
        </React.Fragment>
      ))}
    </div>
  );
};

// Simple Plus icon component since we can't import in this example
const PlusIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default BlockRenderer;