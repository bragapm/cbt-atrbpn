export type IBaseResponse<T> = {
  data: T;
  meta: IBaseMetaResponse;
};

export type IBaseMetaResponse = {
  total_count: number;
  filter_count: number;
};
