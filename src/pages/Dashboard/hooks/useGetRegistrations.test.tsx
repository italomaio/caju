import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { useGetRegistrations } from "./useGetRegistrations";
import { waitFor } from "@testing-library/react";
import { httpClient } from "~/core/http/HttpClient";
import { sampleUser } from "~/utils/tests";

describe("useGetRegistrations hook test", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("Should make the fetch call", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const { result } = renderHook(() => useGetRegistrations({}), {
      wrapper,
    });

    await waitFor(() =>
      expect(result.current.registrations).toEqual([sampleUser])
    );
  });
});
