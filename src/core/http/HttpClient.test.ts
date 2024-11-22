import { RegistrationType } from "~/types/Registration";
import { httpClient } from "./HttpClient";
import { waitFor } from "@testing-library/react";
import { sampleUser } from "~/utils/tests";

describe("HttpClient tests", () => {
  beforeEach(() => jest.clearAllMocks());

  it("Should return new Instance", () => {
    expect(httpClient).toBeTruthy();
  });

  it("Should make a request", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const result = await httpClient.request<RegistrationType[]>({
      url: "/registration",
      method: "GET",
    });

    await waitFor(() => expect(httpClient.request).toHaveBeenCalled());
    await waitFor(() =>
      expect(result).toEqual({ data: [sampleUser], status: 200 })
    );
  });
});
