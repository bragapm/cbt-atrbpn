export interface IDirectusQueryParams {
  fields?: Array<string>;
  sort?: string | Array<string>;
  filter?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  page?: number;
  alias?: string | Array<string>;
  search?: string;
}
