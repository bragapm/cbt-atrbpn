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
  user: IUserSessionTest[];
};

export type IUjianRequest = {
  id?: number | string;
  name: string;
  start_time: Date;
  end_time: Date;
  user: string[];
};

export type IUserSessionTest = {
  id: number;
  session: number;
  user: string;
  created_at: string;
  updated_at: string;
};

export type IUserSessionTestRequest = {
  id?: number | string;
  session: number | string;
  user: string;
};
