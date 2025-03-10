import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import defaultOptions from "./config/reactQuery";
import Layout from "./layouts/Layout";

function App() {
  const queryClient = new QueryClient({ defaultOptions: defaultOptions });
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Router />
          </Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
