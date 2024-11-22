import { waitFor } from "@testing-library/react";
import {
  deleteRegistration,
  getRegistrations,
  postRegistration,
  putRegistration,
} from ".";

import { httpClient } from "~/core/http/HttpClient";
import { sampleUser } from "~/utils/tests";
import { IHttpResponse } from "~/types/Http";
import { RegistrationType } from "~/types/Registration";

describe("Dashboard service tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should fetch all registrations", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    } as IHttpResponse<RegistrationType[]>);

    const result = await getRegistrations({ queryKey: ["registrations", {}] });

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        method: "GET",
        url: "/registrations",
        params: {},
      })
    );

    await waitFor(() => expect(result).toEqual([sampleUser]));
  });

  it("Should fail on fetch registrations", async () => {
    (httpClient.request as jest.Mock).mockRejectedValue({
      status: 500,
    } as IHttpResponse<RegistrationType>);

    await waitFor(async () =>
      expect(
        getRegistrations({ queryKey: ["registrations", {}] })
      ).rejects.toThrow("Erro ao buscar dados.")
    );
  });

  it("Should post new registration", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: sampleUser,
    } as IHttpResponse<RegistrationType>);

    const result = await postRegistration(sampleUser);

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/registrations",
        body: sampleUser,
      })
    );

    await waitFor(() => expect(result).toEqual(sampleUser));
  });

  it("Should fail on post new registration", async () => {
    (httpClient.request as jest.Mock).mockRejectedValue({
      status: 500,
      data: sampleUser,
    } as IHttpResponse<RegistrationType>);

    const result = postRegistration(sampleUser);

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/registrations",
        body: sampleUser,
      })
    );

    await waitFor(() =>
      expect(result).rejects.toThrow(
        "Nao foi possivel cadastrar novo registro."
      )
    );
  });

  it("Should put request on registration", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: { ...sampleUser, status: "APPROVED" },
    } as IHttpResponse<RegistrationType>);

    const result = putRegistration(sampleUser);

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        method: "PUT",
        url: `/registrations/${sampleUser.id}`,
        body: sampleUser,
      })
    );

    await waitFor(() =>
      expect(result).resolves.toEqual({ ...sampleUser, status: "APPROVED" })
    );
  });

  it("Should fail on put registration", async () => {
    (httpClient.request as jest.Mock).mockRejectedValue({
      status: 500,
      data: sampleUser,
    } as IHttpResponse<RegistrationType>);

    const result = putRegistration(sampleUser);

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        method: "PUT",
        url: `/registrations/${sampleUser.id}`,
        body: sampleUser,
      })
    );

    await waitFor(() =>
      expect(result).rejects.toThrow("Nao foi possivel editar registro.")
    );
  });

  it("Should delete  registration", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: sampleUser,
    } as IHttpResponse<RegistrationType>);

    const result = deleteRegistration(sampleUser.id);

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        method: "DELETE",
        url: `/registrations/${sampleUser.id}`,
      })
    );

    await waitFor(() => expect(result).resolves.toEqual(sampleUser));
  });

  it("Should fail on delete registration", async () => {
    (httpClient.request as jest.Mock).mockRejectedValue({
      status: 500,
    } as IHttpResponse<RegistrationType>);

    const result = deleteRegistration(sampleUser.id);

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        method: "DELETE",
        url: `/registrations/${sampleUser.id}`,
      })
    );

    await waitFor(() =>
      expect(result).rejects.toThrow("Nao foi possivel deletar registro.")
    );
  });
});
