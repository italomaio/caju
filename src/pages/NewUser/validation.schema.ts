import * as yup from "yup";
import { validarCPF } from "~/utils/validations";

export const newUserSchema = yup
  .object({
    employeeName: yup
      .string()
      .matches(/^(?!\\d)/, "O nome não pode começar com um número.")
      .matches(
        /[A-Za-z].*[A-Za-z]/,
        "O nome deve conter pelo menos duas letras."
      )
      .matches(
        /^\s*\S+(\s+\S+)+\s*$/,
        "O nome deve conter ao menos duas palavras."
      )
      .required("O campo nome e obrigatorio"),
    email: yup
      .string()
      .email("Preencha com um e-mail valido.")
      .required("O campo e-mail e obrigatorio."),
    cpf: yup
      .string()
      .test("cpf-valido", "Preencha com um CPF valido.", (value) =>
        validarCPF(value)
      )
      .required("O campo CPF e obrigatorio."),
    admissionDate: yup
      .string()
      .required("O campo data de admissao e obrigatorio."),
  })
  .required();
