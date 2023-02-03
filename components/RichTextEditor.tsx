import theme from '../themes/ExampleTheme';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import TreeViewPlugin from '../plugins/TreeViewPlugin';
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  $getRoot,
  $getSelection,
  $getTextContent,
  EditorState,
  LexicalEditor,
  RootNode,
  SerializedEditorState,
  SerializedRootNode,
} from 'lexical';

import ListMaxIndentLevelPlugin from '../plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin';
import AutoLinkPlugin from '../plugins/AutoLinkPlugin';
import { useState } from 'react';

import ReactJson from 'react-json-view'

const Placeholder = () => {
  return <div className="editor-placeholder">Enter some rich text...</div>;
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError = (error: Error, editor: LexicalEditor) => {
  console.error(error);
};

const editorConfig: InitialConfigType = {
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
};

export const RichTextEditor = () => {
  // const [json, setJson] = useState<SerializedEditorState>()
  // const [content, setContent] = useState<SerializedRootNode>();
  // const [text, setText] = useState('');
  
  const onChange = (editorState: EditorState, editor: LexicalEditor) => {
    // setJson(editorState.toJSON());
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root: RootNode = $getRoot();
      const selection = $getSelection();
      const textContent: string = $getTextContent();
      // setContent(root.exportJSON());
      // setText(textContent);
      console.log(root, selection);
    });
  };

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={onChange} />
            <TreeViewPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};
