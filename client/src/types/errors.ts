// Define the structure of the error response
export interface IErrorExtension {
  code: string;
}

export interface IErrorResponse {
  message: string;
  extensions: IErrorExtension;
}

export interface IBaseErrorResponse {
  errors: IErrorResponse[];
}
