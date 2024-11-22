import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Backdrop from "../Backdrop";
import * as S from "./styles";
import { useMemo } from "react";

export default function Loader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = useMemo(
    () => isFetching || isMutating,
    [isFetching, isMutating]
  );

  return (
    isLoading && (
      <Backdrop>
        <S.Loader />
      </Backdrop>
    )
  );
}
