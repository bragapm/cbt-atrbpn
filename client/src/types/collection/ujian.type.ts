export type IUjian = {
  id: number;
  status: string | null;
  name: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  PIN: number | null;
  sesi_ujian: number | null;
};

export type IUjianRequest = {
  id?: number | string;
  name: string;
  start_time: Date;
  user: string;
  sesi_ujian: string;
};
