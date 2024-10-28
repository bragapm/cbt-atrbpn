import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor: React.FC = () => {
  return (
    <div className="w-full h-full">
      <ReactQuill className="rounded-xl h-full w-full" />
    </div>
  );
};

export default RichTextEditor;
