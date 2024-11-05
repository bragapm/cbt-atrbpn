import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDirectusUrl = (filename_disk: string) => {
  const directusUrl = import.meta.env.VITE_DIRECTUS_PUBLIC_URL;

  return directusUrl + "/assets/" + filename_disk;
};

export const downloadFile = (
  fileData: string,
  fileName: string,
  fileType: string
): void => {
  // Convert raw binary content to a Uint8Array
  const binaryData = new Uint8Array(fileData.length);
  for (let i = 0; i < fileData.length; i++) {
    binaryData[i] = fileData.charCodeAt(i);
  }

  // Create a Blob from binary data and initiate download
  const blob = new Blob([binaryData], { type: fileType });
  saveAs(blob, fileName);
};
