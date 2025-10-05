// Import all your block components
import HeadingBlock from './HeadingBlock.jsx';
import TextBlock from './TextBlock.jsx';
import ImageBlock from './ImageBlock.jsx';
import QuoteBlock from './QuoteBlock.jsx';
import VideoBlock from './VideoBlock.jsx';
import ButtonBlock from './ButtonBlock.jsx';

// Block type definitions (configuration objects)
export const blockTypes = {
  heading: {
    name: 'Heading',
    icon: 'Heading',
    category: 'text',
    defaults: {
      level: 'h2',
      content: 'Your Heading Here',
      alignment: 'left',
      className: ''
    },
    component: HeadingBlock // Reference to the actual component
  },
  text: {
    name: 'Text',
    icon: 'Pilcrow',
    category: 'text',
    defaults: {
      content: 'Your text content here...',
      className: ''
    },
    component: TextBlock
  },
  image: {
    name: 'Image',
    icon: 'Image',
    category: 'media',
    defaults: {
      url: '',
      alt: '',
      caption: '',
      alignment: 'center',
      className: ''
    },
    component: ImageBlock
  },
  button: {
    name: 'Button',
    icon: 'Square',
    category: 'design',
    defaults: {
      text: 'Click Me',
      url: '#',
      variant: 'primary',
      alignment: 'left',
      className: ''
    },
    component: ButtonBlock
  },
  quote: {
    name: 'Quote',
    icon: 'Quote',
    category: 'text',
    defaults: {
      content: 'Your quote here...',
      author: '',
      alignment: 'left',
      className: ''
    },
    component: QuoteBlock
  },
  video: {
    name: 'Video',
    icon: 'Play',
    category: 'media',
    defaults: {
      url: '',
      caption: '',
      alignment: 'center',
      className: ''
    },
    component: VideoBlock
  }
};

export const blockCategories = [
  { id: 'all', name: 'All Blocks', icon: 'Grid' },
  { id: 'text', name: 'Text', icon: 'Type' },
  { id: 'media', name: 'Media', icon: 'Image' },
  { id: 'design', name: 'Design', icon: 'Layout' }
];

// Export individual components as named exports
export { HeadingBlock, TextBlock, ImageBlock, QuoteBlock, VideoBlock, ButtonBlock };