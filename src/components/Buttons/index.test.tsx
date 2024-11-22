import Button, { ButtonSmall } from ".";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("Should show button", () => {
    render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i }));
  });

  it("Should change ButtonSmall background to black", async () => {
    render(<ButtonSmall $bgColor="black">Botao Preto</ButtonSmall>);
    expect(screen.getByText("Botao Preto")).toHaveStyle(
      "background-color: black"
    );
  });

  it("Should change ButtonSmall color to black", async () => {
    render(<ButtonSmall $color="black">Botao Preto</ButtonSmall>);
    expect(screen.getByText("Botao Preto")).toHaveStyle("color: black");
  });
});
