import { IHttpClient, IHttpRequestConfig, IHttpResponse } from "~/types/Http";

class HttpClientSingleton {
  private static instance: HttpClientSingleton;
  private client: IHttpClient;

  private constructor(client: IHttpClient) {
    this.client = client;
  }

  public static getInstance(client: IHttpClient): HttpClientSingleton {
    if (!HttpClientSingleton.instance) {
      HttpClientSingleton.instance = new HttpClientSingleton(client);
    }

    return HttpClientSingleton.instance;
  }

  public async request<T>(
    config: IHttpRequestConfig
  ): Promise<IHttpResponse<T>> {
    return this.client<T>(config);
  }
}

export default HttpClientSingleton;
