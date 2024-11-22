import { RegistrationType } from "~/types/Registration";
import { httpClient } from "~/core/http/HttpClient";

export async function getRegistrations({
  queryKey,
}: {
  queryKey: [string, filters: Partial<RegistrationType>];
}) {
  try {
    const [, filters] = queryKey;

    const response = await httpClient.request<RegistrationType[]>({
      url: "/registrations",
      method: "GET",
      params: !!filters && filters,
    });

    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar dados.");
  }
}

export async function postRegistration(registration: RegistrationType) {
  try {
    const response = await httpClient.request<RegistrationType>({
      url: "/registrations",
      method: "POST",
      body: {
        ...registration,
        status: "REVIEW",
      } as RegistrationType,
    });

    return response.data;
  } catch (error) {
    throw new Error("Nao foi possivel cadastrar novo registro.");
  }
}

export async function putRegistration(registration: RegistrationType) {
  try {
    const response = await httpClient.request<RegistrationType>({
      url: `/registrations/${registration.id}`,
      method: "PUT",
      body: registration,
    });

    return response.data;
  } catch (error) {
    throw new Error("Nao foi possivel editar registro.");
  }
}

export async function deleteRegistration(id: string) {
  try {
    const response = await httpClient.request<RegistrationType>({
      url: `/registrations/${id}`,
      method: "DELETE",
    });

    return response.data;
  } catch (error) {
    throw new Error("Nao foi possivel deletar registro.");
  }
}
