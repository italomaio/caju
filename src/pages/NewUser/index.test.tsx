import { customRender, sampleUser } from "~/utils/tests";
import NewUserPage from ".";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { useHistory } from "react-router-dom";
import { httpClient } from "~/core/http/HttpClient";
import { RegistrationType } from "~/types/Registration";

describe("NewUser Page tests", () => {
  const pushMock = jest.fn();
  (useHistory as jest.Mock).mockReturnValue({
    push: pushMock,
  });

  beforeEach(() => {
    const { debug } = customRender(<NewUserPage />, {});
    debug();
  });

  it("Should render newUser page", async () => {
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("Should validate empty form on click button", async () => {
    const registerButton = screen.getByText("Cadastrar");
    await act(() => fireEvent.click(registerButton));

    await waitFor(() =>
      expect(
        screen.getByText("O nome deve conter pelo menos duas letras.")
      ).toBeInTheDocument()
    );
  });

  it("Should go back when click back icon", async () => {
    const backButton = screen.getByTestId("back");
    await act(() => fireEvent.click(backButton));

    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("Should add new user", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const inputNome = screen.getByPlaceholderText("Nome");
    await act(() =>
      fireEvent.change(inputNome, {
        target: { value: sampleUser.employeeName },
      })
    );

    const inputEmail = screen.getByPlaceholderText("E-mail");
    await act(() =>
      fireEvent.change(inputEmail, { target: { value: sampleUser.email } })
    );

    const inputCpf = screen.getByPlaceholderText("CPF");
    await act(() =>
      fireEvent.change(inputCpf, { target: { value: sampleUser.cpf } })
    );

    const inputAdmissionDate = screen.getByPlaceholderText("admissionDate");
    await act(() =>
      fireEvent.change(inputAdmissionDate, {
        target: { value: sampleUser.admissionDate },
      })
    );

    const registerButton = screen.getByText("Cadastrar");
    await act(() => fireEvent.click(registerButton));

    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        url: "/registrations",
        method: "POST",
        body: {
          admissionDate: sampleUser.admissionDate,
          cpf: sampleUser.cpf,
          email: sampleUser.email,
          employeeName: sampleUser.employeeName,
          status: sampleUser.status,
        } as RegistrationType,
      })
    );
  });
});
