import ConfirmDialog from ".";

import { customRender } from "~/utils/tests";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useConfirm } from "~/hooks/useConfirm";
import { act, useCallback } from "react";

describe("ConfirmModal tests", () => {
  const Component = () => {
    const { isOpen, handleDialog, confirm } = useConfirm();

    const onHandleDialog = useCallback(async () => {
      const isConfirmed = await confirm("Voce deseja realizar a acao?");
      handleDialog(!!isConfirmed);
    }, [isOpen]);

    return (
      <div data-testid="confirm-dialog">
        <button
          data-testid="open-dialog-button"
          onClick={() => onHandleDialog()}
        ></button>
        <ConfirmDialog />
      </div>
    );
  };

  beforeAll(() => {
    const portalDiv = document.createElement("div");
    portalDiv.id = "portal";
    document.body.appendChild(portalDiv);
  });

  beforeEach(() => {
    const { debug } = customRender(<Component />, {});
    debug();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument()
    );
  });

  it("Should open dialog", async () => {
    const button = screen.getByTestId("open-dialog-button");
    await act(() => fireEvent.click(button));

    await waitFor(() =>
      expect(screen.getByTestId("confirm-modal")).toBeInTheDocument()
    );
  });

  it("Should confirm and close dialog", async () => {
    const openDialogButton = screen.getByTestId("open-dialog-button");
    await act(() => fireEvent.click(openDialogButton));

    const yesButton = screen.getByTestId("button-yes");
    await act(() => fireEvent.click(yesButton));

    await waitFor(() =>
      expect(screen.queryByTestId("confirm-modal")).toBeNull()
    );
  });
});
