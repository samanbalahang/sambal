import React from 'react';
import {
  Save,
  Undo2,
  Redo2,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Settings,
  MoreVertical,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Trash2,
  Copy,
  Move
} from 'lucide-react';

const Toolbar = ({
  onSave,
  onUndo,
  onRedo,
  onPreview,
  onDeviceViewChange,
  onSettings,
  onFormat,
  currentDeviceView = 'desktop',
  canUndo = false,
  canRedo = false,
  selectedBlock = null
}) => {
  // Formatting options for text blocks
  const textFormatOptions = [
    { icon: Bold, action: 'bold', title: 'Bold' },
    { icon: Italic, action: 'italic', title: 'Italic' },
    { icon: Underline, action: 'underline', title: 'Underline' },
    { icon: AlignLeft, action: 'alignLeft', title: 'Align Left' },
    { icon: AlignCenter, action: 'alignCenter', title: 'Align Center' },
    { icon: AlignRight, action: 'alignRight', title: 'Align Right' },
    { icon: List, action: 'bulletList', title: 'Bullet List' },
    { icon: ListOrdered, action: 'numberedList', title: 'Numbered List' },
    { icon: Quote, action: 'quote', title: 'Quote' },
    { icon: Link, action: 'link', title: 'Add Link' }
  ];

  // Block actions for selected blocks
  const blockActions = [
    { icon: Copy, action: 'duplicate', title: 'Duplicate Block' },
    { icon: Trash2, action: 'delete', title: 'Delete Block' },
    { icon: Move, action: 'move', title: 'Move Block' }
  ];

  // Device view options
  const deviceViews = [
    { icon: Smartphone, view: 'mobile', title: 'Mobile View' },
    { icon: Tablet, view: 'tablet', title: 'Tablet View' },
    { icon: Monitor, view: 'desktop', title: 'Desktop View' }
  ];

  const handleFormat = (formatType) => {
    onFormat?.(formatType);
  };

  const handleBlockAction = (action) => {
    // Handle block-specific actions
    console.log('Block action:', action);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left Section - Document Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Save"
          >
            <Save size={18} />
            <span className="hidden sm:inline">Save</span>
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <Undo2 size={18} />
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <Redo2 size={18} />
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <button
            onClick={onPreview}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            title="Preview"
          >
            <Eye size={18} />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Center Section - Formatting Tools (visible when block is selected) */}
        {selectedBlock && (
          <div className="flex items-center gap-1">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {textFormatOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.action}
                    onClick={() => handleFormat(option.action)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                    title={option.title}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>

            <div className="h-6 w-px bg-gray-300 mx-2" />

            <div className="flex items-center gap-1">
              {blockActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.action}
                    onClick={() => handleBlockAction(action.action)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                    title={action.title}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Section - View Options and Settings */}
        <div className="flex items-center gap-2">
          {/* Device View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {deviceViews.map((device) => {
              const Icon = device.icon;
              const isActive = currentDeviceView === device.view;
              return (
                <button
                  key={device.view}
                  onClick={() => onDeviceViewChange?.(device.view)}
                  className={`p-2 rounded transition-colors ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  title={device.title}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <button
            onClick={onSettings}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            title="Settings"
          >
            <Settings size={18} />
          </button>

          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Block Type Indicator */}
      {selectedBlock && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Type size={14} />
            <span className="font-medium capitalize">
              {selectedBlock.type} Block
            </span>
          </div>
          
          <div className="text-xs text-gray-500">
            Click anywhere to deselect
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;