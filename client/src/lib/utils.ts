import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDirectusUrl = (filename_disk: string) => {
  const directusUrl = import.meta.env.VITE_DIRECTUS_PUBLIC_URL;

  return directusUrl + "/assets/" + filename_disk;
};
