import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { ConfirmContextProvider } from "~/store/context/confirm/ConfirmContextProvider";
import { RegistrationType } from "~/types/Registration";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmContextProvider>
        <ThemeProvider theme={{}}>{children}</ThemeProvider>
      </ConfirmContextProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const sampleUser: RegistrationType = {
  admissionDate: "2024-11-20",
  employeeName: "Joao Ferreira",
  cpf: "407.734.948-63",
  email: "joaoferreira@gmail.com",
  id: "1",
  status: "REVIEW",
};

export { customRender, sampleUser };
