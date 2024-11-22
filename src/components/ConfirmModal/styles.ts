import styled from "styled-components";

export const DialogBox = styled.div`
  background-color: white;
  border: 4px solid #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: scaleUp 0.2s ease-in-out;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: end;
`;
