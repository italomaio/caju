import { customRender } from "~/utils/tests";
import Loader from ".";
import { screen } from "@testing-library/react";

describe("Loader tests", () => {
  beforeEach(() => {
    customRender(<Loader />, {});
  });

  it("Should render correctly", () => {
    expect(screen.getByRole("backdrop")).toBeInTheDocument();
  });
});
