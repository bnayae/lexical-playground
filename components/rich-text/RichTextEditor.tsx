import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import TreeViewPlugin from '../../plugins/TreeViewPlugin';
import ToolbarPlugin from '../../plugins/ToolbarPlugin';
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

import ListMaxIndentLevelPlugin from '../../plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from '../../plugins/CodeHighlightPlugin';
import AutoLinkPlugin from '../../plugins/AutoLinkPlugin';
import { useState } from 'react';
import { editorConfig } from './config/config';

export const RichTextEditor = () => {
  const [data, setData] = useState<unknown | undefined>();

  const Placeholder = () => {
    return <div className="editor-placeholder">Enter some rich text...</div>;
  };

  const onChange = (editorState: EditorState, editor: LexicalEditor) => {
    // setJson(editorState.toJSON());
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root: RootNode = $getRoot();
      const selection = $getSelection();
      const textContent: string = $getTextContent();
      // setContent(root.exportJSON());
      setData(root);
      console.log('Changed', { root, selection, textContent });
    });
  };

  // const onChange = (editorState: EditorState, editor: LexicalEditor) => {
  //   editorState.read(() => {
  //     const json = editorState.toJSON();
  //     console.log(JSON.stringify(json));
  //   })
  // }

  
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
      <button
        onClick={() =>
          sessionStorage.setItem('rich-text', JSON.stringify(data))
        }
      >
        Save
      </button>
      <button
        onClick={() => {
          const d = sessionStorage.getItem('rich-text');
          if (d != null) setData(JSON.parse(d));
        }}
      >
        Load
      </button>
    </>
  );
};
