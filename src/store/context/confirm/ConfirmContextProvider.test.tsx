import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { ConfirmContextProvider } from "./ConfirmContextProvider";
import { useConfirm } from "~/hooks/useConfirm";
import { act, useCallback, useState } from "react";

describe("Confirm Context Provider", () => {
  const ConsumerComponent = () => {
    const { isOpen, confirm, handleDialog, text } = useConfirm();
    const [dialogResult, setDialogResult] = useState<boolean | undefined>();

    const handleOpenDialog = useCallback(async () => {
      const isConfirmed = await confirm("Deseja executar tal acao?");
      setDialogResult(isConfirmed ? true : false);
    }, [confirm]);

    return (
      <div>
        <span data-testid="text-context">{!isOpen ? "Hidden" : "Showing"}</span>
        <span data-testid="dialog-result">{dialogResult ? "YES" : "NO"}</span>
        {isOpen && (
          <div data-testid="dialog">
            <span>{text}</span>
            <button data-testid="button-yes" onClick={() => handleDialog(true)}>
              yes
            </button>
            <button data-testid="button-no" onClick={() => handleDialog(false)}>
              no
            </button>
          </div>
        )}
        <button
          data-testid="openDialog"
          onClick={() => handleOpenDialog()}
        ></button>
      </div>
    );
  };

  beforeEach(() => {
    render(
      <ConfirmContextProvider>
        <ConsumerComponent />
      </ConfirmContextProvider>
    );
  });

  it("Should render", () => {
    expect(screen.getByTestId("text-context")).toBeInTheDocument();
  });

  it("Should initialize props", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("text-context")).toHaveTextContent("Hidden")
    );
  });

  it("Should set isOpen to true", async () => {
    const showConfirmButton = screen.getByTestId("openDialog");
    act(() => fireEvent.click(showConfirmButton));

    await waitFor(() =>
      expect(screen.getByTestId("text-context")).toHaveTextContent("Showing")
    );
  });

  it("Should confirm to true", async () => {
    const showConfirmButton = screen.getByTestId("openDialog");
    act(() => fireEvent.click(showConfirmButton));

    const yesButton = screen.getByTestId("button-yes");
    act(() => fireEvent.click(yesButton));

    await waitFor(() =>
      expect(screen.getByTestId("dialog-result")).toHaveTextContent("YES")
    );
  });

  it("Should confirm to false", async () => {
    const showConfirmButton = screen.getByTestId("openDialog");
    act(() => fireEvent.click(showConfirmButton));

    const noButton = screen.getByTestId("button-no");
    act(() => fireEvent.click(noButton));

    await waitFor(() =>
      expect(screen.getByTestId("dialog-result")).toHaveTextContent("NO")
    );
  });
});
