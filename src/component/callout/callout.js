// // Callout.ts
// import { Node, mergeAttributes } from '@tiptap/core';

// export const Callout = Node.create({
//   name: 'callout',
//   group: 'block',
//   content: 'text*',

//   defining: true,

//   addAttributes() {
//     return {
//       backgroundColor: {
//         default: 'lightgreen',
//       },
//     };
//   },

//   parseHTML() {
//     return [{
//       tag: 'div.callout',
//     }];
//   },

//   renderHTML({ node, HTMLAttributes }) {
//     return ['div', mergeAttributes(HTMLAttributes, {
//       class: 'callout',
//       style: `background-color: ${node.attrs.backgroundColor};`,
//     }), 0];
//   },

//   addCommands() {
//     return {
//       setCallout: attributes => ({ chain }) => {
//         return chain.insertContent({
//           type: 'callout',
//           attrs: attributes,
//         }).run();
//       },
//     };
//   },
// });

import { Node, mergeAttributes } from '@tiptap/core';

const Callout = Node.create({
  name: 'callout',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  content: 'inline*',

  defining: true,

  addAttributes() {
    return {
      color: {
        default: 'blue',
      },
      icon: {
        default: 'info',
      },
      backgroundColor: {
        default: 'lightgreen',
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

  // renderHTML({ node, HTMLAttributes }) {
  //   return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
  //     class: `callout ${node.attrs.color}`,
  //     'data-icon': node.attrs.icon,
  //   }), 0];
  // },

  renderHTML({ node, HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      class: 'callout',
      style: `background-color: ${node.attrs.backgroundColor};`,
    }), 0];
  },

  addCommands() {
    return {
      setCallout: attributes => ({ commands }) => {
        return commands.setNode('callout', attributes);
      },
    };
  },
});

export default Callout;
