import { customRender } from "~/utils/tests";
import { screen } from "@testing-library/react";
import Backdrop from ".";

describe("Backdrop tests", () => {
  beforeEach(() => {
    customRender(<Backdrop />, {});
  });

  it("Should render Backdrop", () => {
    expect(screen.getByRole("backdrop")).toBeInTheDocument();
  });
});
