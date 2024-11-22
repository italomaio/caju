import Router from "~/router";
import { Header } from "./components/Header";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConfirmContextProvider } from "./store/context/confirm/ConfirmContextProvider";
import ConfirmDialog from "./components/ConfirmModal";
import Loader from "./components/Loader";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    console.log("vars", process.env, import.meta.env);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmContextProvider>
        <ConfirmDialog />
        <Loader />
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </ConfirmContextProvider>
    </QueryClientProvider>
  );
}

export default App;
