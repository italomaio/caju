import HttpClientSingleton from "./HttpClientSingleton";

import { IHttpClient, IHttpRequestConfig, IHttpResponse } from "~/types/Http";
import { axiosInstance } from "~/configs/axios";
import { AxiosHeaders } from "axios";

export const axiosClient: IHttpClient = async <T>(
  config: IHttpRequestConfig
): Promise<IHttpResponse<T>> => {
  const { body, method, url, headers, params } = config;

  const response = await axiosInstance.request({
    method,
    url,
    headers,
    data: body,
    params,
  });

  return {
    data: response.data as T,
    headers: response.headers as AxiosHeaders,
    status: response.status,
  };
};

export const httpClient = HttpClientSingleton.getInstance(axiosClient);
