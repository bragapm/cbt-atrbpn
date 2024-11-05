export type IKategori = {
  id: number | string;
  user_created: string;
  date_created: string; // or Date if you prefer handling as Date objects
  user_updated: string;
  date_updated: string; // or Date if preferred as Date objects
  bobot_benar: number;
  bobot_salah: number;
  tidak_menjawab: number;
  nama_kategori: string;
};
