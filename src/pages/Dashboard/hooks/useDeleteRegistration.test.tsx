import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { useDeleteRegistration } from "./useDeleteRegistration";
import { waitFor } from "@testing-library/react";
import { httpClient } from "~/core/http/HttpClient";
import { sampleUser } from "~/utils/tests";

describe("useDeleteRegistration hook test", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("Should make the mutation", async () => {
    (httpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: [sampleUser],
    });

    const { result } = renderHook(() => useDeleteRegistration(), {
      wrapper,
    });

    await waitFor(() => result.current.execute(sampleUser.id));
    await waitFor(() =>
      expect(httpClient.request).toHaveBeenCalledWith({
        url: `/registrations/${sampleUser.id}`,
        method: "DELETE",
      })
    );
  });
});
