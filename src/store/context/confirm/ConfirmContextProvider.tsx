import { ReactNode, useCallback, useState } from "react";
import { ConfirmContextStateType } from "./types";
import { ConfirmContext, initialValue } from "./ConfirmContext";

export const ConfirmContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<ConfirmContextStateType>({
    isOpen: false,
    text: undefined,
  });

  const confirm = useCallback(
    async (text: string) => {
      return new Promise((resolve) => {
        console.log(resolve, "resolver");
        setState({
          isOpen: true,
          text,
          resolve,
        });
      });
    },
    [state]
  );

  const handleDialog = useCallback(
    async (accepted: boolean) => {
      if (state?.resolve) {
        state.resolve(accepted);
        setState(initialValue);
      }
    },
    [state]
  );

  return (
    <ConfirmContext.Provider
      value={{ confirm, handleDialog, isOpen: state.isOpen, text: state.text }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};
