import { customRender } from "~/utils/tests";
import { screen } from "@testing-library/react";
import Backdrop from ".";

describe("Backdrop tests", () => {
  beforeEach(() => {
    const { debug } = customRender(<Backdrop />, {});
    debug();
  });

  it("Should render Backdrop", () => {
    expect(screen.getByRole("backdrop")).toBeInTheDocument();
  });
});
