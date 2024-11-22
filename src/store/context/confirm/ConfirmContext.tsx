import { createContext } from "react";

import { ConfirmContextType } from "./types";

export const initialValue: ConfirmContextType = {
  isOpen: false,
  text: undefined,
  confirm: (text) => Promise.resolve(text),
  handleDialog: (accepted) => Promise.resolve(accepted),
};

export const ConfirmContext = createContext<ConfirmContextType>(initialValue);
