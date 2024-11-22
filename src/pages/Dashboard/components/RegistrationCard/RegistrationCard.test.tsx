import { screen } from "@testing-library/react";
import { customRender, sampleUser } from "~/utils/tests";

import RegistrationCard from ".";

describe("RegistrationCard tests", () => {
  const useMutationMock = jest.fn();
  jest.mock("@tanstack/react-query", () => {
    const originalModule = jest.requireActual("@tanstack/react-query");
    return {
      ...originalModule,
      useMutation: useMutationMock,
    };
  });

  beforeEach(() => {
    const { debug } = customRender(<RegistrationCard data={sampleUser} />, {});
    debug();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly", () => {
    expect(screen.getByText("Joao Ferreira")).toBeInTheDocument();
  });
});
