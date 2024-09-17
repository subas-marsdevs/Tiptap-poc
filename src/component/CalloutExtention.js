import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CalloutComponent from './CalloutComponent'; // Adjust the import path

export default Node.create({
  name: 'callout',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      backgroundColor: {
        default: '#F0F0F0', // Default background color
      },
      iconType: {
        default: "ℹ️", // Default icon type
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.callout',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { style: `background-color: ${node.attrs.backgroundColor}` }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});
