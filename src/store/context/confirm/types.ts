export type ConfirmContextMethodsType = {
  confirm: (text: string) => Promise<unknown>;
  handleDialog: (accepted: boolean) => void;
};

export type ConfirmContextStateType = {
  isOpen: boolean;
  text: string | undefined;
  resolve?: (value: unknown) => void;
};

export type ConfirmContextType = ConfirmContextMethodsType &
  ConfirmContextStateType;
