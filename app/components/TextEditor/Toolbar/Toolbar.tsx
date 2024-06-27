import { type Editor } from "@tiptap/react";
import Toggle from "../../Toggle/Toggle";

// toggle bold, italic, underline, bullet list, ordered list, crossed out, heading, undo and redo

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaStrikethrough,
  FaHeading,
  FaUndo,
  FaRedo,
  FaImage,
} from "react-icons/fa";
import "./style.scss";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const isActive = (type: string) => editor.isActive(type);

  // toggle bold, italic, underline, bullet list, ordered list, crossed out, heading, undo and redo

  const onAddImage = () => {
    const url = window.prompt("Enter the URL of the image:");

    try {
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="toolbar">
      <Toggle
        state={isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FaBold />
      </Toggle>
      <Toggle
        state={isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </Toggle>

      <Toggle
        state={isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FaListUl />
      </Toggle>

      <Toggle
        state={isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <FaListOl />
      </Toggle>

      <Toggle
        state={isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FaUnderline />
      </Toggle>

      <Toggle
        state={isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <FaStrikethrough />
      </Toggle>

      <Toggle
        state={isActive("heading")}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <FaHeading />
      </Toggle>

      <Toggle state={false} onClick={onAddImage}>
        <FaImage />
      </Toggle>

      <Toggle
        state={isActive("undo")}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <FaUndo />
      </Toggle>

      <Toggle
        state={isActive("redo")}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <FaRedo />
      </Toggle>
    </div>
  );
};

export default Toolbar;
