import styled from "styled-components";

const Backdrop = styled.div.attrs(() => ({
  role: "backdrop",
}))`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.2s ease-in-out;
  z-index: 1000;
`;

export default Backdrop;
