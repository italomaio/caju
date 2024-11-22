import { FormProvider, useForm } from "react-hook-form";
import { ControlledInput } from ".";
import { customRender } from "~/utils/tests";
import { screen } from "@testing-library/react";

describe("ControlledInput tests", () => {
  const ComponentWrapper = () => {
    const methods = useForm({});

    return (
      <FormProvider data-testid="form-provider" {...methods}>
        <ControlledInput
          name="nome"
          label="Nome"
          defaultValue=""
          inputProps={{
            placeholder: "Nome",
          }}
        />
      </FormProvider>
    );
  };

  beforeEach(() => {
    customRender(<ComponentWrapper />, {});
  });

  it("Should render correctly", () => {
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
  });
});
