import React from 'react';

const DragItemComponent = ({ node, updateAttributes, editor }) => {
  return (
    <div contentEditable={false} data-type="drag_item">
      <div contentEditable={true}>{node.content.size ? null : "Type something..."}</div>
      <div style={{ cursor: 'grab' }}>⠿</div>
    </div>
  );
};

export default DragItemComponent;
