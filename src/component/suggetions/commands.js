import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

const Commands = Extension.create({
  name: "mention",

  defaultOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }) => {
        props.command({ editor, range, props });
      }
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});

export default Commands;

// import { Extension } from "@tiptap/core";
// import Suggestion from "@tiptap/suggestion";
// import getSuggestionItems from "./getSuggestionItems"; // Make sure this path is correct

// // Define the type for the suggestion items
// interface SuggestionItem {
//   title: string;
//   command: ({ editor, range }: { editor: any; range: any }) => void;
// }

// // Define the type for the suggestion option
// interface SuggestionOptions {
//   char: string;
//   startOfLine: boolean;
//   items: (query: string) => SuggestionItem[];
//   command: ({ editor, range, props }: { editor: any; range: any; props: any }) => void;
// }

// const Commands = Extension.create({
//   name: "mention",

//   defaultOptions: {
//     suggestion: {
//       char: "/",
//       startOfLine: false,
//       command: ({ editor, range, props }) => {
//         props.command({ editor, range, props });
//       },
//       // Add the items method with proper typing
//       items: getSuggestionItems
//     } as SuggestionOptions
//   },

//   addProseMirrorPlugins() {
//     return [
//       Suggestion({
//         editor: this.editor,
//         ...this.options.suggestion
//       })
//     ];
//   }
// });

// export default Commands;

