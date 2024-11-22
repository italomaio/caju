import { Controller, useFormContext } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { Input } from "../TextField";

type Props = {
  defaultValue: string;
  name: string;
  label: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export function ControlledDatePicker({
  defaultValue,
  name,
  label,
  inputProps = {},
}: Props) {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const error = errors?.[name];

  return (
    <div>
      <label htmlFor={inputProps?.id}>{label}</label>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => <Input type="date" {...field} {...inputProps} />}
      />

      <span style={{ fontSize: 12, color: "red" }}>
        {error?.message?.toString()}
      </span>
    </div>
  );
}
