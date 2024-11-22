import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationType } from "~/types/Registration";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: RegistrationType[];
};
const Columns = (props: Props) => {
  return (
    <S.Container data-testid="columns">
      {allColumns.map((columm) => {
        return (
          <S.Column status={columm.status} key={columm.title}>
            <>
              <S.TitleColumn status={columm.status}>
                {columm.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {props?.registrations
                  ?.filter((x) => x.status === columm.status)
                  .map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    );
                  })}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
