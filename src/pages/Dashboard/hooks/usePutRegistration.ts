import { useMutation } from "@tanstack/react-query";
import { putRegistration } from "~/services/Dashboard";

export const usePutRegistration = () => {
  const { mutate: execute } = useMutation({
    mutationKey: ["putRegistration"],
    mutationFn: putRegistration,
  });

  return { execute };
};
