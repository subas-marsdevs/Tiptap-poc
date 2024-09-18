// import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

// export default function DraggableNode(){
//   return (
//     <NodeViewWrapper className="relative group cursor-pointer">
//       {/* Drag Handle */}
//       <div className="absolute left-0 top-0 -ml-8 flex items-center justify-center h-full group-hover:opacity-100 transition-opacity duration-300">
//         <div className="p-2 cursor-grab bg-gray-300 text-white rounded-full">
//           {/* Adjust this as necessary for your design */}
//           <div style={{ opacity: 1, backgroundColor: 'red' }}>:::</div>

//         </div>
//       </div>
//       <NodeViewContent className="pl-10" />
//     </NodeViewWrapper>
//   );
// };

import { Node } from '@tiptap/core';

 const DragItemNode = Node.create({
  name: 'drag_item',

  group: 'block',
  draggable: true,
  content: 'paragraph+',

  toDOM: () => {
    return ['div', { 'data-type': 'drag_item' }, 0];
  },

  parseDOM: [{
    tag: 'div[data-type="drag_item"]',
  }],
});

export default DragItemNode

