import { Route, Routes } from "react-router-dom";
import { routes } from "./utils/routes";
import Navbar from "./components/Navbar";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./utils/wagmi";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className=" relative">
          <Navbar />
          <Routes>
            {...routes.map((route) => {
              return (
                <Route
                  key={route.id}
                  path={route.route}
                  Component={route.element}
                />
              );
            })}
          </Routes>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
