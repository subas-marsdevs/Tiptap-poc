import { Extension } from '@tiptap/core';
import { NodeSelection, Plugin } from '@tiptap/pm/state';
import { __serializeForClipboard as serializeForClipboard } from '@tiptap/pm/view';

function removeNode(node) {
  node.parentNode.removeChild(node);
}

function absoluteRect(node) {
  const data = node.getBoundingClientRect();
  return {
    top: data.top,
    left: data.left,
    width: data.width,
  };
}

export const DragHandle = Extension.create({
  name: 'dragHandle',

  addProseMirrorPlugins() {
    function blockPosAtCoords(coords, view) {
      const pos = view.posAtCoords(coords);
      let node = view.domAtPos(pos.pos);

      node = node.node;

      while (node && node.parentNode) {
        if (node.parentNode?.classList?.contains('ProseMirror')) {
          break;
        }
        node = node.parentNode;
      }

      if (node && node.nodeType === 1) {
        const desc = view.docView.nearestDesc(node, true);

        if (!(!desc || desc === view.docView)) {
          return desc.posBefore;
        }
      }
      return null;
    }

    function dragStart(e, view) {
      if (!e.dataTransfer) {
        return;
      }

      const coords = { left: e.clientX + 50, top: e.clientY };
      const pos = blockPosAtCoords(coords, view);

      if (pos != null) {
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)));

        const slice = view.state.selection.content();
        const { dom, text } = serializeForClipboard(view, slice);

        e.dataTransfer.clearData();
        e.dataTransfer.setData('text/html', dom.innerHTML);
        e.dataTransfer.setData('text/plain', text);

        const el = document.querySelector('.ProseMirror-selectednode');
        e.dataTransfer?.setDragImage(el, 0, 0);
        view.dragging = { slice, move: true };
      }
    }

    let dropElement;
    const WIDTH = 28;

    return [
      new Plugin({
        view(editorView) {
          const element = document.createElement('div');
          element.draggable = 'true';
          element.classList.add('global-drag-handle');
          element.addEventListener('dragstart', (e) => dragStart(e, editorView));
          dropElement = element;
          document.body.appendChild(dropElement);

          return {
            destroy() {
              removeNode(dropElement);
              dropElement = null;
            },
          };
        },
        props: {
          handleDrop(view, event, slice, moved) {
            if (moved) {
              // Logic for handling drop and reordering
            }
          },
          handleDOMEvents: {
            mousemove(view, event) {
              const coords = {
                left: event.clientX + WIDTH + 50,
                top: event.clientY,
              };
              const pos = view.posAtCoords(coords);

              if (pos) {
                let node = view.domAtPos(pos?.pos);

                if (node) {
                  node = node.node;
                  while (node && node.parentNode) {
                    if (node.parentNode?.classList?.contains('ProseMirror')) {
                      break;
                    }
                    node = node.parentNode;
                  }

                  if (node instanceof Element) {
                    const cstyle = window.getComputedStyle(node);
                    const lineHeight = parseInt(cstyle.lineHeight, 10);
                    const top = 0;
                    const rect = absoluteRect(node);
                    const win = node.ownerDocument.defaultView;

                    rect.top += win.pageYOffset + (lineHeight - 24) / 2 + top;
                    rect.left += win.pageXOffset;
                    rect.width = `${WIDTH}px`;

                    dropElement.style.left = `${-WIDTH + rect.left}px`;
                    dropElement.style.top = `${rect.top}px`;
                  }
                }
              }
            },
          },
        },
      }),
    ];
  },
});

  // const handleDrop = (event: any) => {
  //   event.preventDefault();
  //   const draggedNodeId = event.dataTransfer.getData('text/plain');
  //   const { pos } = editor?.view.posAtCoords({ left: event.clientX, top: event.clientY });

  //   // Move the block to the dropped position
  //   editor?.chain().focus().moveNode({ from: draggedNodeId, to: pos }).run();
  // };

  // const handleDragOver = (event: any) => {
  //   event.preventDefault(); // Necessary to allow drop
  // };

