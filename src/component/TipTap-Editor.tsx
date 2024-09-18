'use client'

import './style.scss'
import dynamic from 'next/dynamic';
import StarterKit from '@tiptap/starter-kit'
import React, { useState, useEffect } from 'react'
import MenuBar from './editor-menubar'
import { EditorContent, useEditor, ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { FloatingMenu } from './floating-menu'
import Dropcursor from '@tiptap/extension-dropcursor'
import BulletList from '@tiptap/extension-bullet-list'
import Commands from './suggetions/commands';
import getSuggestionItems from "./suggetions/items";
import renderItems from "./suggetions/renderItems";
import Blockquote from '@tiptap/extension-blockquote'
import Callout from './callout/callout';
import ReactComponent from './callout/CalloutExtention'
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// import CodeBlockComponent from './codeblock/CodeBlockComponent'
// import DraggableNode from './drag-drop/DragNode'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

const CodeBlockComponent = dynamic(() => import('./codeblock/CodeBlockComponent'), { ssr: false });


const lowlight = createLowlight(all)

// you can also register individual languages
// lowlight.register('html', html)
// lowlight.register('css', css)
// lowlight.register('js', js)
// lowlight.register('ts', ts)

export default () => {

  const editor = useEditor({
    extensions: [
      Dropcursor.configure({
        color: 'red',
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Image,
      BulletList,
      Blockquote,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Underline,
      Placeholder.configure({
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        placeholder: ({ editor }) => {
          if (editor.isEmpty) {
            if (editor.isFocused) {
              return 'Type / to browse options';
            } else {
              return 'Click here to start writing';
            }
          } else{
            if (editor.isFocused) {
              return 'Type / to browse options';
            } else {
              return '';
            }

          }
        }
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems
        }
      }),
      CodeBlockLowlight
        .extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlockComponent)
          },
        }).configure({ lowlight }),
      // Callout,
      ReactComponent,
    ],
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
        display: none;
      }</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
       <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
      <react-component />
    `,
    // onUpdate: ({ transaction, editor }) => {
    //   if (transaction.docChanged) {
    //     const { selection } = transaction;
    //     const { anchor } = selection;
    //     const pos = editor.view.coordsAtPos(anchor);
    //     setMenuPosition({ top: pos.top, left: pos.left });
    //   }
    // },
    // onSelectionUpdate: ({ editor }) => {
    //   const slashIndex = editor.state.doc.textBetween(0, editor.state.selection.anchor, " ").lastIndexOf('/');
    //   setShowMenu(slashIndex !== -1 && editor.state.selection.empty);
    // }
    
  })


  // const addCalloutRed = () => {
  //   if (editor) {
  //     editor.chain().focus().setCallout({ backgroundColor: 'red' }).run();
  //   }
  // };
  
  // const CalloutToolbar = () => {
  //   if (!editor) return null;
  //   const { color, icon } = editor.getAttributes('callout');
  
  //   const updateCallout = (attrName: any, value: any) => {
  //     editor.chain().focus().setContent({ ...editor.getAttributes('callout'), [attrName]: value }).run();
  //   };
  
  //   return editor.isActive('callout') ? (
  //     <div >
  //       Color: <input type="color" value={color} onChange={(e) => updateCallout('color', e.target.value)} />
  //       Icon: <input type="text" value={icon} onChange={(e) => updateCallout('icon', e.target.value)} />
  //     </div>
  //   ) : null;
  // };

  // const addCallout = () => {
  //   editor?.chain().focus().setNode('callout', { backgroundColor: 'lightgreen' }).run();
  // };

  return (
    <>
      <div className="fixed top-0 z-10 w-full">
        <div className='max-w-screen-xl mx-auto px-5 py-2 mt-14 bg-[#edf2fa] rounded-s-full rounded-e-full min-h-14'>
          <MenuBar editor={editor} />
        </div>
      </div>
      <div className="min-h-screen max-w-screen-md mx-auto px-5 py-2 mt-32">
        <EditorContent 
          editor={editor} 
        />
      </div>
    </>
  )
}