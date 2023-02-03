import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import theme from '../../../themes/ExampleTheme';
import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { $createParagraphNode, $createTextNode, $getRoot, LexicalEditor, RootNode } from 'lexical';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError = (error: Error, editor: LexicalEditor) => {
    console.error(error);
  };

const prepopulatedRichText = (): void =>{
    const root = $getRoot();
    // RootNode.importJSON();
    // root.exportJSON();
    if (root.getFirstChild() === null) {
      const paragraph = $createParagraphNode();
      paragraph.append(
        $createTextNode("The playground is a demo environment built with "),
        $createTextNode("@lexical/react").toggleFormat("code"),
        $createTextNode("."),
        $createTextNode(" Try typing in "),
        $createTextNode("some text").toggleFormat("bold"),
        $createTextNode(" with "),
        $createTextNode("different").toggleFormat("italic"),
        $createTextNode(" formats.")
      );
      root.append(paragraph);
    }
  }
  
export const editorConfig: InitialConfigType = {
    namespace: 'default',
    // The editor theme
    theme,
    // Handling of errors during update
    onError,
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: prepopulatedRichText
  };