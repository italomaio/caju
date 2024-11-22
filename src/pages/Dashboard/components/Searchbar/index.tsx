import * as S from "./styles";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { IconButton } from "~/components/Buttons/IconButton";
import { useQueryClient } from "@tanstack/react-query";

import Button from "~/components/Buttons";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import { useState } from "react";

export const SearchBar = ({
  onChangeFilters,
}: {
  onChangeFilters: Function;
}) => {
  const [filter, setFilter] = useState<any>({});
  const history = useHistory();
  const queryClient = useQueryClient();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        data-testid="filterByCPF"
        aria-label="Filtrar por CPF"
        mask="CPF"
        placeholder="Digite um CPF válido"
        value={filter.cpf}
        defaultValue={filter.cpf}
        onFill={(e) => {
          if (e.detail.isValid || e.detail.value === "") {
            setFilter((curr: any) => ({ ...curr, cpf: e.detail.value }));
            onChangeFilters({ cpf: e.detail.value });
          }
        }}
      />
      <S.Actions>
        <IconButton
          aria-label="Atualizar"
          data-testid="refetch"
          onClick={() =>
            queryClient.invalidateQueries({
              queryKey: ["registrations"],
            })
          }
        >
          <HiRefresh />
        </IconButton>
        <Button
          aria-label="Adicionar novo usuario"
          name="new-user"
          onClick={() => goToNewAdmissionPage()}
        >
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
