export interface IHttpRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string> | Object;
}

export interface IHttpResponse<T> {
  data: T | undefined;
  status: number;
  headers: Record<string, string>;
}

export type IHttpClient = <T>(
  config: IHttpRequestConfig
) => Promise<IHttpResponse<T>>;
