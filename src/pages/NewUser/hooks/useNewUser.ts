import { useMutation } from "@tanstack/react-query";
import { postRegistration } from "~/services/Dashboard";

export function useNewUser() {
  const { mutate } = useMutation({
    mutationKey: ["newUser"],
    mutationFn: postRegistration,
  });

  return { mutate };
}
