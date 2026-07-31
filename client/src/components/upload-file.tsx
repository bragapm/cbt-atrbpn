import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, getDirectusUrl } from "@/lib/utils";
import { CloudUpload, Expand, RefreshCw, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type IUploadFile = {
  title: string;
  value: File | null | string;
  onChange: (file: File | null | string) => void;
  className?: string;
  accept?: string;
  /** Hide the remove action where clearing the field does not undo anything. */
  allowRemove?: boolean;
};

const UploadFile: React.FC<IUploadFile> = ({
  title,
  value,
  onChange,
  className,
  accept,
  allowRemove = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const file = value instanceof File ? value : null;
  // A saved file arrives as a Directus file id (string), not a File.
  const savedFileId = typeof value === "string" && value ? value : null;
  const hasValue = Boolean(file || savedFileId);

  // Preview the picked file locally; the browser owns the url, so release it
  // as soon as the selection changes.
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setObjectUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setObjectUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const previewUrl = savedFileId ? getDirectusUrl(savedFileId) : objectUrl;
  const fileLabel = file?.name ?? (savedFileId ? "Gambar tersimpan" : null);
  const replaceLabel = allowRemove ? "Ganti gambar" : "Unggah gambar lain";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    }
    // Reset so picking the same file twice still fires a change.
    event.target.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange(null);
    setIsPreviewOpen(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) onChange(droppedFile);
  };

  return (
    <div
      className={cn("group w-[210px] shrink-0", className)}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      {hasValue ? (
        <div
          className={cn(
            "flex min-h-[52px] h-full items-center gap-2 rounded-md border border-primary/50 bg-primary/5 px-2 py-1.5",
            isDragging && "border-primary border-dashed bg-primary/10"
          )}
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded border border-primary/30 bg-white">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={fileLabel ?? title}
                className="h-full w-full object-cover"
              />
            ) : (
              <CloudUpload className="h-full w-full p-2 text-primary/70" />
            )}
            {previewUrl && (
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                title="Lihat gambar"
                className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-150 motion-reduce:transition-none hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group-hover:opacity-100"
              >
                <Expand className="h-4 w-4" />
                <span className="sr-only">Lihat gambar</span>
              </button>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span className="block text-xs text-gray-500">{title}</span>
            <p className="truncate text-sm text-primary">{fileLabel}</p>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={triggerFileInput}
              title={replaceLabel}
              className="rounded p-1.5 text-primary transition-colors motion-reduce:transition-none hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">{replaceLabel}</span>
            </button>
            {allowRemove && (
              <button
                type="button"
                onClick={handleRemove}
                title="Hapus gambar"
                className="rounded p-1.5 text-gray-400 transition-colors motion-reduce:transition-none hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Hapus gambar</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={triggerFileInput}
          className={cn(
            "flex min-h-[52px] h-full w-full items-center justify-between gap-2 rounded-md border border-dashed border-gray-400 bg-background px-4 py-2 text-left text-primary transition-colors motion-reduce:transition-none hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            isDragging && "border-primary bg-primary/10"
          )}
        >
          <div className="flex min-w-0 flex-col items-start gap-1">
            <span className="text-xs text-gray-500">{title}</span>
            <p className="truncate text-sm">
              {isDragging ? "Lepas untuk unggah" : "Pilih file"}
            </p>
          </div>
          <CloudUpload className="h-4 w-4 shrink-0" />
        </button>
      )}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-base font-light">
              {fileLabel ?? title}
            </DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <img
              src={previewUrl}
              alt={fileLabel ?? title}
              className="max-h-[70vh] w-full rounded-md border object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadFile;
