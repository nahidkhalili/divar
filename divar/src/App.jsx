import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import defaultOptions from "./config/reactQuery";
import Layout from "./layouts/Layout";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({ defaultOptions: defaultOptions });
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Layout>
          <Router />
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
