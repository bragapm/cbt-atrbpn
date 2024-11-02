import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type IRichTextEditor = {
  value?: string;
  onChange?: (value: string) => void;
};

const RichTextEditor: React.FC<IRichTextEditor> = ({ value, onChange }) => {
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "img",
    "formula",
  ];

  return (
    <div className="w-full h-full">
      <ReactQuill
        value={value}
        onChange={onChange}
        className="rounded-xl h-full w-full"
        modules={{
          toolbar: {
            container: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          },
          clipboard: {
            matchVisual: true,
          },
        }}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor;
