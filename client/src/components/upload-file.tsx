import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

const UploadFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log({ file });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      handleUpload(event.target.files[0]);
    }
  };

  const handleUpload = async (fileToUpload: File) => {
    setUploading(true);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      // Replace 'your-upload-endpoint' with your actual API endpoint
      const response = await fetch("your-upload-endpoint", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
        // You can add user feedback here
      } else {
        console.error("File upload failed");
        // You can add error feedback here
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // You can add error feedback here
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
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
        disabled={uploading}
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
    </>
  );
};

export default UploadFile;
