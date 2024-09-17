import React, { 
    useState, 
    useEffect, 
    useCallback, 
    useRef 
} from 'react';
// import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import { 
    FaListUl, FaListOl,
} from 'react-icons/fa';
import { IoMdLink } from "react-icons/io";
import { BsLink } from "react-icons/bs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaRegImage } from "react-icons/fa6";
import { CgUndo } from "react-icons/cg";
import { ImUndo } from "react-icons/im";
import { ImRedo } from "react-icons/im";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { BiCodeBlock } from "react-icons/bi";
import { BsParagraph } from "react-icons/bs";
import { TbClearFormatting } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import { IoCodeSlash } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { MdStrikethroughS } from "react-icons/md";
import { RiStrikethrough } from "react-icons/ri";
import { BsTypeItalic } from "react-icons/bs";
import { MdFormatBold } from "react-icons/md";
import { GrUnderline } from "react-icons/gr";
import { HiOutlineSpeakerphone } from "react-icons/hi";

export default function MenuBar({editor}: any) {
    const [heading, setHeading] = useState<number | string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkActiveHeading = () => {
          for (let level = 1; level <= 6; level++) {
            if (editor?.isActive('heading', { level })) {
              setHeading(level);
              return; 
            }
          }
        };
    
        checkActiveHeading();
    
        return () => {
          // If you've added an event listener, clean it up here
          editor?.off('transaction', checkActiveHeading);
        };
    }, [editor]);

    const handleChange = useCallback((e: any) => {
        const newHeading = e.target.value;
        setHeading(newHeading);
        if (newHeading) {
          editor.chain().focus().toggleHeading({ level: Number(newHeading) }).run();
        } else {
          editor.chain().focus().toggleHeading({ level: heading }).run();
        }
    }, [editor, heading]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onload = (readerEvent) => {
            const result = readerEvent.target?.result;
            if (typeof result === 'string') {
              editor.chain().focus().setImage({ src: result }).run();
              editor.chain().focus().setHorizontalRule().run()
            
            }
          };
          reader.readAsDataURL(file);  // Convert the image file to a base64 string

        }
    };

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
          return
        }
    
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
          return
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
          .run()
      }, [editor])


    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <button
                    data-tooltip-id="bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    className={`${editor.isActive('bold') ? 'is-active' : ''} text-2xl`}
                >
                 <MdFormatBold />
                </button>
                <button
                    data-tooltip-id="italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    className={`${editor.isActive('italic') ? 'is-active' : ''} text-xl`}
                >
                    <BsTypeItalic />
                </button>
                <button
                    data-tooltip-id="strike"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                    }
                    className={`${editor.isActive('strike') ? 'is-active' : ''} text-xl`}

                >
                    <RiStrikethrough />
                </button>
                <button
                    data-tooltip-id="underline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`${editor.isActive('underline') ? 'is-active' : ''} text-xl`}
                >
                    <GrUnderline />
                </button>
                <button
                    data-tooltip-id="code"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                    }
                    className={`${editor.isActive('code') ? 'is-active' : ''} text-lg`}
                >
                    <FaCode />
                </button>
                <button
                    data-tooltip-id="clear-marks" 
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                >
                    <TbClearFormatting />
                </button>
                <button
                    data-tooltip-id="paragraph"  
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    <BsParagraph />
                </button>
                <button
                    className={
                        editor.isActive('heading', { level: 1 }) ||
                        editor.isActive('heading', { level: 2 }) ||
                        editor.isActive('heading', { level: 3 }) ||
                        editor.isActive('heading', { level: 4 }) ||
                        editor.isActive('heading', { level: 5 }) ||
                        editor.isActive('heading', { level: 6 })
                         ? 'is-active' : ''}
                >
                <select 
                    value={heading} 
                    onChange={handleChange}
                >
                    <option value=''>Normal text</option>
                    <option value={1}>Heading 1</option>
                    <option value={2}>Heading 2</option>
                    <option value={3}>Heading 3</option>
                    <option value={4}>Heading 4</option>
                    <option value={5}>Heading 5</option>
                    <option value={6}>Heading 6</option>
                    </select>
                </button>
                <button
                    data-tooltip-id="bulletList"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <FaListUl />
                </button>
                <button
                    data-tooltip-id="orderedList"            
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <FaListOl />
                </button>
                <button
                    data-tooltip-id="codeBlock"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`${editor.isActive('codeBlock') ? 'is-active' : ''} text-xl`}
                >
                    <BiCodeBlock />
                </button>
                <button
                    data-tooltip-id="blockquote"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`${editor.isActive('blockquote') ? 'is-active' : ''} text-lg`}
                >
                    <BiSolidQuoteAltRight />
                </button>
                <button 
                    data-tooltip-id="horizontal-rule"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <MdOutlineHorizontalRule />
                </button>
                <button
                    data-tooltip-id="link"
                    className='text-2xl'
                    onClick={setLink}
                >
                    
                    <BsLink />
                </button>
                <button
                    data-tooltip-id="image"
                    className='text-base'
                    onClick={handleClick}
                >
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onFileSelected} 
                        ref={fileInputRef}
                        className='hidden'
                    />
                    <FaRegImage />
                </button>

                <button
                    data-tooltip-id="undo"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                    }
                >
                    <ImUndo />
                </button>
                <button
                    data-tooltip-id="redo"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                    }
                >
                    <ImRedo />
                </button>
                <button
                    data-tooltip-id="callout"
                    onClick={() => editor?.chain().focus().setNode('callout').run()}
                    className={`${editor.isActive('callout') ? 'is-active' : ''} text-xl`}
                >
                    <HiOutlineSpeakerphone />
                </button>
                {/*
                <button
                    onClick={() => editor.chain().focus().setCallout({ backgroundColor: 'red' }).run()}
 
                >
                    red
                </button> */}
                <ReactTooltip
                    id="bold"
                    place="bottom"
                    content="Bold (Ctrl + B)"
                />
                <ReactTooltip
                    id="callout"
                    place="bottom"
                    content="Callout"
                />
                <ReactTooltip
                    id="code"
                    place="bottom"
                    content="Code"
                />
                <ReactTooltip
                    id="italic"
                    place="bottom"
                    content="Italic (Ctrl + I)"
                />
                <ReactTooltip
                    id="strike"
                    place="bottom"
                    content="Strike"
                />
                <ReactTooltip
                    id="link"
                    place="bottom"
                    content="Insert link (Ctrl + K)"
                />
                <ReactTooltip
                    id="image"
                    place="bottom"
                    content="Insert image"
                />
                <ReactTooltip
                    id="undo"
                    place="bottom"
                    content="Undo (Ctrl + Z)"
                />
                <ReactTooltip
                    id="redo"
                    place="bottom"
                    content="Redo (Ctrl + Y)"
                />
                <ReactTooltip
                    id="horizontal-rule"
                    place="bottom"
                    content="Horizontal rule"
                />
                <ReactTooltip
                    id="codeBlock"
                    place="bottom"
                    content="Code block"
                />
                <ReactTooltip
                    id="blockquote"
                    place="bottom"
                    content="Blockquote"
                />
                <ReactTooltip
                    id="orderedList"
                    place="bottom"
                    content="Numbered list (Ctrl + Shift + 7)"
                />
                <ReactTooltip
                    id="bulletList"
                    place="bottom"
                    content="Bulleted list (Ctrl + Shift + 8)"
                />
                <ReactTooltip
                    id="paragraph"
                    place="bottom"
                    content="Paragraph"
                />
                <ReactTooltip
                    id="clear-marks"
                    place="bottom"
                    content="Clear marks"
                />
                <ReactTooltip
                    id="underline"
                    place="bottom"
                    content="Toggle underline"
                />
            </div>
        </div>
    );
}
