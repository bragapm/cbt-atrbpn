import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import React, { useRef } from "react";

type IUploadFile = {
  value: File | null | string;
  onChange: (file: File | null | string) => void;
};

const UploadFile: React.FC<IUploadFile> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const file = value as File;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        variant="upload"
        size="upload"
        onClick={triggerFileInput}
        className={cn("", {
          "bg-primary/10 border-primary": file?.name,
        })}
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-gray-500">Unggah Gambar</span>
          <p>{file?.name ? file?.name : "File Upload"}</p>
        </div>
        <CloudUpload className="ml-2" />
      </Button>
    </div>
  );
};

export default UploadFile;
