import * as S from "./styles";
import Button from "~/components/Buttons";

import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ControlledInput } from "~/components/ControlledInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { newUserSchema } from "./validation.schema";

import routes from "~/router/routes";
import { ControlledDatePicker } from "~/components/ControlledDatePicker";
import { useNewUser } from "./hooks/useNewUser";

const NewUserPage = () => {
  const history = useHistory();
  const { mutate } = useNewUser();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(newUserSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<any> = (data) => {
    mutate(data, {
      onSuccess(data, variables, context) {
        console.log(data, variables, context);
        goToHome();
      },
      onError(error, variables, context) {
        console.log("error", error, variables, context);
      },
    });
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton
          onClick={() => goToHome()}
          aria-label="back"
          data-testid="back"
        >
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.FormContainer>
              <ControlledInput
                name="employeeName"
                label="Nome"
                defaultValue=""
                inputProps={{ placeholder: "Nome" }}
              />
              <ControlledInput
                name="email"
                label="E-mail"
                defaultValue=""
                inputProps={{ placeholder: "E-mail" }}
              />
              <ControlledInput
                name="cpf"
                label="CPF"
                defaultValue=""
                inputProps={{ placeholder: "CPF", mask: "CPF" }}
              />
              <ControlledDatePicker
                name="admissionDate"
                label="Data de admissão"
                defaultValue=""
                inputProps={{
                  placeholder: "admissionDate",
                }}
              />

              <Button type="submit">Cadastrar</Button>
            </S.FormContainer>
          </form>
        </FormProvider>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
