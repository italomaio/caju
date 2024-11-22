import { Controller, useFormContext } from "react-hook-form";
import React, { InputHTMLAttributes, useMemo } from "react";
import { Masks } from "~/utils/formatters";
import { Input } from "../TextField";
import { InputMask, InputMaskProps } from "@react-input/mask";

type Props = {
  defaultValue: string;
  name: string;
  label: string;
  inputProps: InputHTMLAttributes<HTMLInputElement> & {
    mask?: keyof typeof Masks;
  };
};

export function ControlledInput({
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
  const { mask } = inputProps;

  const { Component, fixedProps } = useMemo(() => {
    const haveMask = !!mask;

    return {
      Component: haveMask ? InputMask : Input,
      fixedProps: haveMask
        ? ({
            ...Masks[mask],
            component: Input || undefined,
          } as Partial<InputMaskProps>)
        : {},
    };
  }, [mask]);

  return (
    <div>
      <label htmlFor={inputProps?.id}>{label}</label>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) =>
          React.createElement(Component, {
            ...inputProps,
            ...field,
            ...fixedProps,
          })
        }
      />

      <span style={{ fontSize: 12, color: "red" }}>
        {error?.message?.toString()}
      </span>
    </div>
  );
}
