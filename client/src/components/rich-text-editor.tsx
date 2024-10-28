import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type IRichTextEditor = {
  value?: string;
  onChange?: (value: string) => void;
};

const RichTextEditor: React.FC<IRichTextEditor> = ({ value, onChange }) => {
  return (
    <div className="w-full h-full">
      <ReactQuill
        value={value}
        onChange={onChange}
        className="rounded-xl h-full w-full"
      />
    </div>
  );
};

export default RichTextEditor;
