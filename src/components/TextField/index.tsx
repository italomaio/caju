import React, { InputHTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { InputMask, InputMaskProps, MaskEvent } from "@react-input/mask";
import { Masks } from "~/utils/formatters";

export const Input = styled.input`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;

type Props = {
  label?: string;
  error?: string;
  mask?: keyof typeof Masks;
  onFill?: (event: MaskEvent) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ label, error, mask, onFill, ...props }: Props) => {
  const { Component, fixedProps } = useMemo(() => {
    const haveMask = !!mask;

    return {
      Component: haveMask ? InputMask : Input,
      fixedProps: haveMask
        ? ({
            ...Masks[mask],
            component: Input || undefined,
            onMask: (e) => onFill && onFill(e),
          } as Partial<InputMaskProps>)
        : {},
    };
  }, [mask, props]);

  return (
    <div>
      <label htmlFor={props?.id}>{label}</label>
      {React.createElement(Component, {
        ...fixedProps,
        ...props,
      })}
      <span style={{ fontSize: 12, color: "red" }}>{error}</span>
    </div>
  );
};

export default TextField;
