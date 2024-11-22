import { useContext, useEffect, useState } from "react";
import { ConfirmContext } from "./ConfirmContext";
import { render, screen, waitFor } from "@testing-library/react";

describe("Context tests", () => {
  const Consumer = () => {
    const { confirm, handleDialog } = useContext(ConfirmContext);
    const [resolved, setResolved] = useState<boolean | undefined>();

    useEffect(() => {
      (async () => {
        const isConfirmed = await confirm("Deseja mesmo executar acao?");
        setResolved(!!isConfirmed);

        await handleDialog(true);
      })();
    }, [confirm, handleDialog]);

    return (
      <div data-testid="context">
        {resolved && <span data-testid="resolved">RESOLVED</span>}
      </div>
    );
  };

  beforeEach(() => {
    render(<Consumer />);
  });

  it("Should render", () => {
    expect(screen.getByTestId("context")).toBeInTheDocument();
  });

  it("Should resolve promise from confirm", async () => {
    await waitFor(() =>
      expect(screen.getByTestId("resolved")).toHaveTextContent("RESOLVED")
    );
  });
});
