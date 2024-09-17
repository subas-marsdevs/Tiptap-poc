import { 
  FaBold, FaItalic, FaStrikethrough, FaParagraph, 
  FaListUl, FaListOl, FaQuoteRight, FaUndo, FaRedo, FaMinus 
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
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6 } from "react-icons/lu";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const getSuggestionItems = (query) => {
  const normalizedQuery = typeof query === 'string' ? query.toLowerCase() : '';

  return [
    // {
    //   title: "H1",
    //   icon: <MdFormatBold />, // Just as an example, use appropriate icon
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    //   }
    // },
    // {
    //   title: "H2",
    //   icon: <MdFormatBold />, // Use a different or the same icon based on your design
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    //   }
    // },
    {
      title: "Bold",
      icon: <MdFormatBold />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBold().run();
      }
    },
    {
      title: "Italic",
      icon: <BsTypeItalic />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleItalic().run();
      }
    },
    {
      title: "Strike",
      icon: <RiStrikethrough />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleStrike().run();
      }
    },
    {
      title: "Callout",
      icon: <HiOutlineSpeakerphone />,
      command: ({ editor, range }) => {
        editor?.chain().focus().setNode('callout').run()
        // editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      }
    },
    {
      title: "Code",
      icon: <FaCode />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCode().run();
      }
    },
    {
      title: "Insert link",
      icon: <FaItalic />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleItalic().run();
      }
    },
    {
      title: "Insert image",
      icon: <FaItalic />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleItalic().run();
      }
    },
    {
      title: "Code block",
      icon: <BiCodeBlock />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
      }
    },
    {
      title: "Numbered list",
      icon: <FaListOl />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      }
    },

    {
      title: "Bulleted list",
      icon: <FaListUl />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      }
    },
    {
      title: "Paragraph",
      icon: <BsParagraph />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setParagraph().run();
      }
    },
    {
      title: "Toggle underline",
      icon: <GrUnderline />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleUnderline().run();
      }
    },
    {
      title: "Clear marks",
      icon: <TbClearFormatting />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).unsetAllMarks().run();
      }
    },
    {
      title: "Horizontal rule",
      icon: <MdOutlineHorizontalRule />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      }
    },
    // {
    //   title: "Undo",
    //   icon: <ImUndo />,
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().undo().run();
    //   }
    // },
    // {
    //   title: "Redo",
    //   icon: <ImRedo />,
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().redo().run();
    //   }
    // },
    {
      title: "Blockquote",
      icon: <BiSolidQuoteAltRight />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range)?.toggleBlockquote().run();
      }
    },
    {
      title: "Heading 1",
      icon: <LuHeading1 />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run();
      }
    },
    {
      title: "Heading 2",
      icon: <LuHeading2 />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run();
      }
    },
    {
      title: "Heading 3",
      icon: <LuHeading3 />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleHeading({ level: 3 }).run();
      }
    },
    {
      title: "Heading 4",
      icon: <LuHeading4 />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleHeading({ level: 4 }).run();
      }
    },
    {
      title: "Heading 5",
      icon: <LuHeading5 />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleHeading({ level: 5 }).run();
      }
    },
    {
      title: "Heading 6",
      icon: <LuHeading6 />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleHeading({ level: 6 }).run();
      }
    },
  ]
  .filter(item => item.title.toLowerCase().startsWith(normalizedQuery))
};

export default getSuggestionItems;
