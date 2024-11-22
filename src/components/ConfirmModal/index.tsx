import { createPortal } from "react-dom";
import { useConfirm } from "~/hooks/useConfirm";
import * as S from "./styles";
import Button from "../Buttons";
import Backdrop from "../Backdrop";

const ConfirmDialog = () => {
  const { isOpen, text, handleDialog } = useConfirm();

  const component = isOpen && (
    <Backdrop
      data-testid="confirm-modal"
      role="button"
      onClick={() => handleDialog && handleDialog(false)}
    >
      <S.DialogBox>
        <p>{text}</p>
        <S.ButtonsWrapper>
          <Button
            $size="small"
            $variant="outlined"
            data-testid="button-yes"
            onClick={() => handleDialog && handleDialog(true)}
          >
            Sim
          </Button>
          <Button
            $size="small"
            data-testid="button-no"
            onClick={() => handleDialog && handleDialog(false)}
          >
            Nao
          </Button>
        </S.ButtonsWrapper>
      </S.DialogBox>
    </Backdrop>
  );

  return createPortal(component, document.getElementById("portal")!);
};

export default ConfirmDialog;
