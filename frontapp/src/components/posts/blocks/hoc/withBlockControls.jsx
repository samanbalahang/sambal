import React from 'react';

const withBlockControls = (WrappedComponent) => {
  return function WithBlockControls(props) {
    const enhancedProps = {
      ...props,
      // Add common block control functionality here
      onFocus: () => {
        props.onSelect?.(props.block.id);
        props.onFocus?.();
      },
      onBlur: () => {
        props.onBlur?.();
      }
    };

    return <WrappedComponent {...enhancedProps} />;
  };
};

export default withBlockControls;