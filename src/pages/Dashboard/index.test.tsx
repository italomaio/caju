import { fireEvent, getByText, screen, waitFor } from "@testing-library/react";
import { customRender, sampleUser } from "~/utils/tests";

import Dashboard from "./index";
import { httpClient } from "~/core/http/HttpClient";
import { act } from "react";
import { useHistory } from "react-router-dom";

describe("Dashboard page tests", () => {
  const pushMock = jest.fn();
  (useHistory as jest.Mock).mockReturnValue({
    push: pushMock,
  });

  beforeEach(() => {
    const { debug } = customRender(<Dashboard />, {});
    debug();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Should render correctly", () => {
    expect(screen.getByTestId("columns")).toBeInTheDocument();
  });

  it("Should fetch registrations", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    await waitFor(() => expect(httpClient.request).toHaveBeenCalled());
  });

  it("Should render registrations items", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    customRender(<Dashboard />, {});

    await waitFor(() => expect(httpClient.request).toHaveBeenCalled());
    await waitFor(() => {
      expect(screen.getByText(sampleUser.employeeName)).toBeInTheDocument();
    });
  });

  it("Should refetch on click button", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const refetchButton = screen.getByTestId("refetch");
    await act(() => fireEvent.click(refetchButton));

    await waitFor(() => expect(httpClient.request).toHaveBeenCalled());
    await waitFor(() => {
      expect(screen.getByText(sampleUser.employeeName)).toBeInTheDocument();
    });
  });

  it("Should filter by valid CPF", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const inputCpf = screen.getByTestId("filterByCPF");
    await act(() =>
      fireEvent.change(inputCpf, { target: { value: "407.734.948-63" } })
    );

    await waitFor(() => expect(httpClient.request).toHaveBeenCalled());
    await waitFor(() => {
      expect(screen.getByText(sampleUser.employeeName)).toBeInTheDocument();
    });
  });

  it("Should filter by invalid CPF", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const inputCpf = screen.getByTestId("filterByCPF");
    await act(() =>
      fireEvent.change(inputCpf, { target: { value: "111.111.111-11" } })
    );

    await waitFor(() => expect(httpClient.request).toHaveBeenCalled());
    await waitFor(() => {
      expect(screen.getByText(sampleUser.employeeName)).toBeInTheDocument();
    });
  });

  it("Should redirect to new-user when click button", async () => {
    const newUserButton = screen.getByText("Nova Admissão");
    await act(() => fireEvent.click(newUserButton));

    expect(pushMock).toHaveBeenCalledWith("/new-user");
  });
});
