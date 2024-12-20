import * as S from "./styles";
import Collumns from "./components/Columns";

import { SearchBar } from "./components/Searchbar";
import { useGetRegistrations } from "./hooks/useGetRegistrations";
import { useState } from "react";
import { RegistrationType } from "~/types/Registration";

const DashboardPage = () => {
  const [filters, setFilters] = useState<Partial<RegistrationType>>();

  const { registrations } = useGetRegistrations(filters as RegistrationType);

  return (
    <S.Container>
      <SearchBar
        onChangeFilters={(value: RegistrationType) => setFilters(value)}
      />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};

export default DashboardPage;
