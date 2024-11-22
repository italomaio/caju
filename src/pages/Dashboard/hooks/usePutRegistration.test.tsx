import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { usePutRegistration } from "./usePutRegistration";
import { waitFor } from "@testing-library/react";
import { httpClient } from "~/core/http/HttpClient";
import { sampleUser } from "~/utils/tests";

describe("usePutRegistration hook test", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("Should make the mutation", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const { result } = renderHook(() => usePutRegistration(), {
      wrapper,
    });

    await waitFor(() => result.current.execute(sampleUser));
    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        url: `/registrations/${sampleUser.id}`,
        method: "PUT",
        body: sampleUser,
      })
    );
  });
});
