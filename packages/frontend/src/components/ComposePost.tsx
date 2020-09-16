import React, { useRef, useState } from "react";
import Editor from "draft-js-plugins-editor";
import { EditorState } from "draft-js";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import "draft-js/dist/Draft.css";
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import Header from "./shared/Header";
import Button from "./shared/Button";
import { gql, useMutation } from "@apollo/client";
import { stateToMarkdown } from "draft-js-export-markdown";

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

export default function ComposePost() {
  const editorRef = useRef<Editor | null>(null);
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [commit] = useMutation(gql`
    mutation ComposePostMutation($input: CreatePostInput!) {
      createPost(input: $input) {
        id
      }
    }
  `);

  function handleClick() {
    editorRef.current?.focus();
  }

  function createPost() {
    commit({
      variables: {
        input: {
          title,
          text: stateToMarkdown(editorState.getCurrentContent()),
        },
      },
    });
  }

  return (
    <div className="container mx-auto mt-6">
      <Header>New Post.</Header>

      <input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div
        className="border border-gray-200 rounded shadow p-4 mt-4"
        onClick={handleClick}
      >
        <div style={{ minHeight: 140 }}>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            plugins={[toolbarPlugin]}
            ref={editorRef}
          />
        </div>
        <Toolbar />
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={createPost}>Create Post</Button>
      </div>
    </div>
  );
}
