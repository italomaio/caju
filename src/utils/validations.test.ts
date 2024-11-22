import { validarCPF } from "./validations";

describe("Validations utils tests", () => {
  it("Should validate a CPF number to true", () => {
    const fn = validarCPF("407.734.948-63");
    expect(fn).toBe(true);
  });

  it("Should validate a CPF number to false", () => {
    const fn = validarCPF("123.456.789-10");
    expect(fn).toBe(false);
  });

  it("Should validate a CPF less than 11 chars", () => {
    const fn = validarCPF("123.456.789-1");
    expect(fn).toBe(false);
  });

  it("Should validate a CPF with eleven repeated chars", () => {
    const fn = validarCPF("111.111.111-11");
    expect(fn).toBe(false);
  });
});
