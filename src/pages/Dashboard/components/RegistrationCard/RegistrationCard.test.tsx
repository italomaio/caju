import { fireEvent, screen, waitFor } from "@testing-library/react";
import { customRender, sampleUser } from "~/utils/tests";
import { RegistrationType } from "~/types/Registration";
import { httpClient } from "~/core/http/HttpClient";
import { act } from "react";

import RegistrationCard from ".";

describe("RegistrationCard tests", () => {
  beforeEach(() => {
    customRender(<RegistrationCard data={sampleUser} />, {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("Should render correctly", () => {
    expect(screen.getByText("Joao Ferreira")).toBeInTheDocument();
  });

  it("Should call put on click approved button", async () => {
    const button = await screen.findByText("Aprovar");
    act(() => fireEvent.click(button));

    await waitFor(async () =>
      expect(await httpClient.request<RegistrationType>).toHaveBeenCalledWith({
        url: `/registrations/${sampleUser.id}`,
        method: "PUT",
        body: { ...sampleUser, status: "APPROVED" } as RegistrationType,
      })
    );
  });

  it("Should call put on click reproved button", async () => {
    const button = await screen.findByText("Reprovar");
    act(() => fireEvent.click(button));

    await waitFor(async () =>
      expect(await httpClient.request<RegistrationType>).toHaveBeenCalledWith({
        url: `/registrations/${sampleUser.id}`,
        method: "PUT",
        body: { ...sampleUser, status: "REPROVED" } as RegistrationType,
      })
    );
  });

  it("Should call put on click review button", async () => {
    customRender(
      <RegistrationCard data={{ ...sampleUser, status: "APPROVED" }} />,
      {}
    );

    const button = await screen.findByText("Revisar novamente");
    act(() => fireEvent.click(button));

    await waitFor(async () =>
      expect(await httpClient.request<RegistrationType>).toHaveBeenCalledWith({
        url: `/registrations/${sampleUser.id}`,
        method: "PUT",
        body: { ...sampleUser, status: "REVIEW" } as RegistrationType,
      })
    );
  });

  it("Should call delete on click trash icon button", async () => {
    await act(async () =>
      fireEvent.click(await screen.getByTestId(`delete-${sampleUser.id}`))
    );

    await waitFor(async () =>
      expect(await httpClient.request<RegistrationType>).toHaveBeenCalledWith({
        url: `/registrations/${sampleUser.id}`,
        method: "DELETE",
      })
    );
  });
});
