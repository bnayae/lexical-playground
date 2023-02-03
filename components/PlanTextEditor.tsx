import React from 'react';
import { $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical';
import { useEffect } from 'react';

import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import theme from "../themes/ExampleTheme";

interface IProps {}

export const PlanTextEditor = (props: IProps) => {
  // When the editor changes, you can get notified via the
  // LexicalOnChangePlugin!
  const onChange = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, selection);
    });
  };

  // Lexical React plugins are React components, which makes them
  // highly composable. Furthermore, you can lazy load plugins if
  // desired, so you don't pay the cost for plugins until you
  // actually use them.
  const MyCustomAutoFocusPlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // Focus the editor when the effect fires!
      editor.focus();
    }, [editor]);

    return null;
  }

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  const onError = (error: Error, editor: LexicalEditor) => {
    console.error(error);
  };

  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
};
