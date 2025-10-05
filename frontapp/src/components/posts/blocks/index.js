// Import everything first
import HeadingBlock from './types/HeadingBlock';
import TextBlock from './types/TextBlock';
import ImageBlock from './types/ImageBlock';
import QuoteBlock from './types/QuoteBlock';
import VideoBlock from './types/VideoBlock';
import ButtonBlock from './types/ButtonBlock';

import Toolbar from './toolbar/Toolbar';
import InserterToolbar from './toolbar/InserterToolbar';
import BlockControls from './toolbar/BlockControls';

import BlockButton from './BlockButton';
import BlockModal from './BlockModal';
import BlockRenderer from './BlockRenderer';

import { blockTypes, blockCategories } from './types/blockTypes';
import withBlockControls from './hoc/withBlockControls.jsx';

// Export everything individually
export {
  HeadingBlock,
  TextBlock,
  ImageBlock,
  QuoteBlock,
  VideoBlock,
  ButtonBlock,
  Toolbar,
  InserterToolbar,
  BlockControls,
  BlockButton,
  BlockModal,
  BlockRenderer,
  blockTypes,
  blockCategories,
  withBlockControls
};

// Default export for convenience
const Blocks = {
  HeadingBlock,
  TextBlock,
  ImageBlock,
  QuoteBlock,
  VideoBlock,
  ButtonBlock,
  Toolbar,
  InserterToolbar,
  BlockControls,
  BlockButton,
  BlockModal,
  BlockRenderer,
  blockTypes,
  blockCategories
};

export default Blocks;