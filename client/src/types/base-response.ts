export type IBaseResponse<T> = {
  score: any;
  max_score: any;
  map(arg0: (item: any) => any): unknown;
  data: T;
  meta: IBaseMetaResponse;
};

export type IBaseMetaResponse = {
  total_count: number;
  filter_count: number;
  totalCount?:number;
};
