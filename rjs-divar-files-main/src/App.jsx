import AuthPage from "./pages/AuthPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1>پروژه دیوار</h1>
        <AuthPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
