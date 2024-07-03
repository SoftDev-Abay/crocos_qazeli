// import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import InputErrorText from "../InputErrorText/InputErrorText";

import Image from "@tiptap/extension-image";
import {
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React, { useEffect } from "react";
import Toolbar from "./Toolbar/Toolbar";
import "./style.scss";
import { Controller, useController } from "react-hook-form";

const TextEditor = ({
  control,
  name,
  error,
  defaultValue,
}: {
  control: any;
  name: string;
  error?: string;
  defaultValue?: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const editor = useEditor({
          extensions: [StarterKit.configure(), Underline, Image],
          content: field.value || defaultValue || "",
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
          <div>
            <div className="text-editor-container">
              <Toolbar editor={editor} />
              <EditorContent editor={editor} />
            </div>

            {error && <InputErrorText error={error} />}
          </div>
        );
      }}
    />
  );
};

export default TextEditor;
