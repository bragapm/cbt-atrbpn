export type CreatePesertaCBTFormValue = {
  idPeserta: string;
  namaPeserta: string;
  nomorKontak: string;
  sesiUjian: string;
};

export type EditPesertaCBTFormValue = {
  code?: string;
  nama_peserta?: string;
  nomor_kontak?: string;
  sesi_ujian?: string;
};

export type ImportPesertaCBTFormValue = {
  filePeserta: File | null;
};
