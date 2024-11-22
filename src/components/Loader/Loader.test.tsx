import { customRender } from "~/utils/tests";
import Loader from ".";
import { screen } from "@testing-library/react";

describe("Loader tests", () => {
  beforeEach(() => {
    const { debug } = customRender(<Loader />, {});
    debug();
  });

  it("Should render correctly", () => {
    expect(screen.getByRole("backdrop")).toBeInTheDocument();
  });
});
