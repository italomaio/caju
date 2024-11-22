import styled, { css } from "styled-components";

const Button = styled.button.attrs<{
  $size?: "small" | "default";
  $variant?: "outlined" | "filled";
}>((props) => ({
  $size: props.$size || "default",
  $variant: props.$variant || "filled",
}))`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: #64a98c;
  cursor: pointer;
  height: 56px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;

  ${(props) =>
    props.$size === "small" &&
    css`
      padding: 4px 18px;
      border-radius: 26px;
      font-size: 12px;
      height: 36px;
    `}

  ${(props) =>
    props.$variant === "outlined" &&
    css`
      background: transparent;
      border: 1px solid #64a98c;
      color: #64a98c;
    `}
`;

export const ButtonSmall = styled.button<{
  $bgColor?: string;
  $color?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.$bgColor ?? "none"};
  color: ${(props) => props.$color ?? "#000"};
  cursor: pointer;
`;

export default Button;
