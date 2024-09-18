import React, { useState, useRef, useEffect } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

const CalloutComponent = ({ node, updateAttributes }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const wrapperRef = useRef(null);

  const colors = ['#F0F0F0', '#ffdcdc', '#ddedfd'];

  const iconMapping = {
    info: "ℹ️",
    warning: "⚠️",
    tip: "💡"
  };

  const handleColorChange = (color) => {
    updateAttributes({ backgroundColor: color });
  };

  const handleIconChange = (icon) => {
    updateAttributes({ iconType: icon });
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowColorPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NodeViewWrapper className="react-component" ref={wrapperRef} onClick={() => setShowColorPicker(true)} style={{ backgroundColor: node.attrs.backgroundColor }}>
      <span className="callout-icon">{node.attrs.iconType}</span>
      {showColorPicker && (
        <div className='absolute bottom-full  right-0 shadow z-10 bg-white border rounded-md px-5 py-2'>
          <div>
            <span className='text-sm'>Background: </span>
            <div className='flex gap-5 h-full my-1'>
                {colors?.map((clr, index) => (
                    <div 
                        onClick={() => handleColorChange(clr)}
                        style={{ backgroundColor: clr, cursor: 'pointer' }}
                        className="h-7 w-7 rounded-lg border"
                    />
                ))}
            </div>
          </div>
          <div>
            <span className='text-sm'>Icon: </span>
            <div className='flex gap-5 h-full my-1'>
                {Object.entries(iconMapping).map(([key, symbol]) => (
                    <button
                        key={key} 
                        onClick={() => handleIconChange(symbol)}
                    >
                        {symbol}
                    </button>
                ))}
            </div>
          </div>
        </div>
      )}
      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};

export default CalloutComponent;
