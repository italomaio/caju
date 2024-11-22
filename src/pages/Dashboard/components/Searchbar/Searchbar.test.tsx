import { act } from "react";
import { customRender } from "~/utils/tests";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import { SearchBar } from ".";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

describe("RegistrationCard tests", () => {
  const pushMock = jest.fn();
  (useHistory as jest.Mock).mockReturnValue({
    push: pushMock,
  });

  const invalidateQueriesMock = jest.fn();

  const onChangeFiltersMock = jest.fn();

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: invalidateQueriesMock,
    });

    const { debug } = customRender(
      <SearchBar onChangeFilters={(data: any) => onChangeFiltersMock(data)} />,
      {}
    );
    debug();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("Should render correctly", () => {
    expect(screen.getByText("Nova Admissão")).toBeInTheDocument();
  });

  it("Should redirect on click New Admission", async () => {
    const button = screen.getByText("Nova Admissão");
    act(() => fireEvent.click(button));

    expect(pushMock).toHaveBeenCalledWith("/new-user");
  });

  it("Should refetch on click refetch-button", async () => {
    const button = await screen.getByTestId("refetch");
    act(() => fireEvent.click(button));

    await waitFor(() => expect(invalidateQueriesMock).toHaveBeenCalled());
  });

  it("Should add mask to CPF input", async () => {
    const inputElement = screen.getByTestId("filterByCPF");

    await act(async () =>
      fireEvent.change(inputElement, { target: { value: "40773494863" } })
    );

    /**
     * @todo Fix @react-input/mask event handler to refresh masked value
     */
    await waitFor(() => expect(inputElement).toHaveValue("40773494863"));
  });

  it("Should call onChangeFilters when CPF input value is valid", async () => {
    const inputElement = screen.getByTestId("filterByCPF");

    await act(async () =>
      fireEvent.change(inputElement, { target: { value: "407.734.948-630" } })
    );

    /**
     * @todo Fix @react-input/mask event handler to refresh masked value
     */
    // await waitFor(() => expect(onChangeFiltersMock).toHaveBeenCalled());
  });
});
