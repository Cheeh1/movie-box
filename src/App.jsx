import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterLink from "./routes/router";
import { FavoriteProvider } from "./context/FavoriteContext";

const queryClient = new QueryClient({});

const App = () => {
  return (
    <>
      <FavoriteProvider>
        <QueryClientProvider client={queryClient}>
          <RouterLink />
        </QueryClientProvider>
      </FavoriteProvider>
    </>
  );
};
export default App;
