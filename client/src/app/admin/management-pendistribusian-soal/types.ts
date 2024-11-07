export type CreatePendistribusianSoal = {
  materi_id: string;
  kategori_id: string;
  jumlah_soal: number;
};

export type PendistribusianSoalFormValue = {
  kategori_soal: string;
  jumlah_soal: number;
  bobot_benar: number;
  bobot_salah: number;
  tidak_menjawab: number;
};
