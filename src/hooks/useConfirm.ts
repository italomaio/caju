import { useContext } from "react";
import { ConfirmContext } from "~/store/context/confirm/ConfirmContext";
import { ConfirmContextType } from "~/store/context/confirm/types";

export const useConfirm = (): ConfirmContextType => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }

  return context;
};
