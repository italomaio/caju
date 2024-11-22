import { useMutation } from "@tanstack/react-query";
import { deleteRegistration } from "~/services/Dashboard";

export const useDeleteRegistration = () => {
  const { mutate: execute } = useMutation({
    mutationKey: ["deleteRegistration"],
    mutationFn: deleteRegistration,
  });

  return { execute };
};
