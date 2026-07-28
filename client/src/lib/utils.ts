import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDirectusUrl = (filename_disk: string) => {
  const directusUrl = import.meta.env.VITE_DIRECTUS_PUBLIC_URL;

  return directusUrl + "/assets/" + filename_disk;
};

export const exportEndpoints = {
  pertanyaan: "/export-pertanyaan",
  session: "/export-session",
  distribusi: "/export-distribusi",
  kategoriSoal: "/export-kategori-soal",
  hasilAkhirUjian: "/export-hasil-akhir-ujian",
  hasilAkhirJawaban: "/export-hasil-akhir-jawaban",
} as const;

export type ExportEndpoint =
  (typeof exportEndpoints)[keyof typeof exportEndpoints];

export const downloadExport = (endpoint: ExportEndpoint) => {
  window.location.href = import.meta.env.VITE_DIRECTUS_PUBLIC_URL + endpoint;
};
