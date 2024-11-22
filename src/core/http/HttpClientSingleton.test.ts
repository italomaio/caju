import HttpClientSingleton from "./HttpClientSingleton";

import { IHttpClient, IHttpRequestConfig, IHttpResponse } from "~/types/Http";
import { sampleUser } from "~/utils/tests";
import { RegistrationType } from "~/types/Registration";
import { waitFor } from "@testing-library/react";

describe("HttpClientSingleton tests", () => {
  beforeEach(() => {
    (HttpClientSingleton as any).instance = undefined;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return the same instance", () => {
    const mockClient: IHttpClient = jest.fn();
    const instance1 = HttpClientSingleton.getInstance(mockClient);
    const instance2 = HttpClientSingleton.getInstance(mockClient);

    expect(instance1).toBe(instance2);
  });

  it("Should make a request with mock client", async () => {
    const mockClient: IHttpClient = jest.fn().mockResolvedValue({
      data: [sampleUser],
      headers: {},
      status: 200,
    } as IHttpResponse<RegistrationType[]>);

    const client = HttpClientSingleton.getInstance(mockClient);

    const config: IHttpRequestConfig = {
      url: "/registration",
      method: "GET",
    };

    const response = await client.request<RegistrationType>(config);

    expect(mockClient).toHaveBeenCalled();
    await waitFor(() =>
      expect(response).toEqual({ data: [sampleUser], status: 200, headers: {} })
    );
  });
});
