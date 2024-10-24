export type CreatePesertaCBTFormValue = {
  idPeserta: string;
  namaPeserta: string;
  nomorKontak: string;
  sesiUjian: string;
};

export type EditPesertaCBTFormValue = {
  idPeserta?: string;
  namaPeserta?: string;
  nomorKontak?: string;
  sesiUjian?: string;
};

export type ImportPesertaCBTFormValue = {
  filePeserta: File | null;
};
