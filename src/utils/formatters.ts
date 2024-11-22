export const Masks = {
  CPF: {
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  },
  CNPJ: {
    mask: "__.___.___/____-__",
    replacement: { _: /\d/ },
  },
  CELULAR: {
    mask: "(__) _ ____-____",
    replacement: { _: /\d/ },
  },
  TELEFONE: {
    mask: "(__) ____-____",
    replacement: { _: /\d/ },
  },
};
