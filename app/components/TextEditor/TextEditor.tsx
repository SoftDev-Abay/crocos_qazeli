// import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React from "react";
import Toolbar from "./Toolbar/Toolbar";
import "./style.scss";
import { Controller } from "react-hook-form";
const TextEditor = ({
  description,
  control,
  name,
}: {
  description?: string;
  control: any;
  name: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={description || ""}
      render={({ field }) => {
        const editor = useEditor({
          extensions: [StarterKit.configure(), Underline],
          content: description,
          editorProps: {
            attributes: {
              class: "editor",
            },
          },
          onUpdate: ({ editor }) => {
            field.onChange(editor.getHTML());
          },
        });

        return (
          <div className="text-editor-container">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        );
      }}
    />
  );
};

export default TextEditor;
