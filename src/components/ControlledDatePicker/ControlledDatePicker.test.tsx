import { FormProvider, useForm } from "react-hook-form";
import { ControlledDatePicker } from ".";
import { customRender } from "~/utils/tests";
import { screen } from "@testing-library/react";

describe("ControlledDatePicker tests", () => {
  const ComponentWrapper = () => {
    const methods = useForm({});

    return (
      <FormProvider data-testid="form-provider" {...methods}>
        <ControlledDatePicker
          name="admissionDate"
          label="Data Admissao"
          defaultValue=""
          inputProps={{
            placeholder: "Data de admissao",
          }}
        />
      </FormProvider>
    );
  };

  beforeEach(() => {
    customRender(<ComponentWrapper />, {});
  });

  it("Should render correctly", () => {
    expect(screen.getByPlaceholderText("Data de admissao")).toBeInTheDocument();
  });
});
