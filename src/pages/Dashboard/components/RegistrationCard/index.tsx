import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";

import { RegistrationType } from "~/types/Registration";
import { useCallback } from "react";
import { useConfirm } from "~/hooks/useConfirm";
import { useDeleteRegistration } from "../../hooks/useDeleteRegistration";
import { useQueryClient } from "@tanstack/react-query";
import { usePutRegistration } from "../../hooks/usePutRegistration";

import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

type Props = {
  data: RegistrationType;
};

const RegistrationCard = (props: Props) => {
  const { confirm } = useConfirm();
  const { execute: executeDelete } = useDeleteRegistration();
  const { execute: executePut } = usePutRegistration();

  const queryClient = useQueryClient();

  const onDeleteRegistration = useCallback(
    async (id: string) => {
      const isConfirmed = await confirm(
        "Voce esta prestes a deletar um registro. Deseja mesmo prosseguir?"
      );

      if (isConfirmed) {
        executeDelete(id, {
          onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["registrations"] });
          },
          onError() {
            throw new Error("Cannot delete registration");
          },
        });
      }
    },
    [confirm, executeDelete, queryClient]
  );

  const onPutRegistration = useCallback(
    async (data: RegistrationType) => {
      const isConfirmed = await confirm(
        "Voce esta prestes a mudar o status do candidato. Deseja mesmo prosseguir?"
      );

      if (isConfirmed) {
        executePut(data, {
          onSuccess(data, variables, context) {
            console.log(data, variables, context);
            queryClient.invalidateQueries({ queryKey: ["registrations"] });
          },
          onError() {
            throw new Error("Cannot delete registration");
          },
        });
      }
    },
    [confirm, executePut, queryClient]
  );

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3 aria-label="Nome do funcionario">{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p aria-label="E-mail do funcionario">{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span aria-label="Data de admissao do funcionario">
          {props.data.admissionDate}
        </span>
      </S.IconAndText>
      <S.Actions>
        <S.ButtonsWrapper>
          {props.data.status === "REVIEW" ? (
            <>
              <ButtonSmall
                aria-label="Mudar status para Reprovado"
                onClick={() =>
                  onPutRegistration({ ...props.data, status: "REPROVED" })
                }
                $bgColor="rgb(255, 145, 154)"
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                aria-label="Mudar status para Aprovado"
                onClick={() =>
                  onPutRegistration({ ...props.data, status: "APPROVED" })
                }
                $bgColor="rgb(155, 229, 155)"
              >
                Aprovar
              </ButtonSmall>
            </>
          ) : (
            <ButtonSmall
              aria-label="Mudar status para Revisar"
              onClick={() =>
                onPutRegistration({ ...props.data, status: "REVIEW" })
              }
              $bgColor="#ff8858"
            >
              Revisar novamente
            </ButtonSmall>
          )}
        </S.ButtonsWrapper>
        <HiOutlineTrash
          aria-label="Excluir registro"
          data-testid={`delete-${props.data.id}`}
          onClick={() => onDeleteRegistration(props.data.id)}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
