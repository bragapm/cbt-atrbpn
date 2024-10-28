export type IMateri = {
  id: number;
  user_created: string;
  date_created: string; // or Date if you want to handle this as a Date object
  user_updated: string | null;
  date_updated: string | null; // or Date if you prefer a Date object
  materi: string;
};
