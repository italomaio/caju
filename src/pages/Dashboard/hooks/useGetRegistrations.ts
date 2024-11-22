import { useQuery } from "@tanstack/react-query";
import { getRegistrations } from "~/services/Dashboard";
import { RegistrationType } from "~/types/Registration";

export function useGetRegistrations(filters: Partial<RegistrationType>) {
  const { data: registrations, refetch: refetchRegistrations } = useQuery({
    queryKey: ["registrations", filters],
    queryFn: getRegistrations,
  });

  return { registrations, refetchRegistrations };
}
