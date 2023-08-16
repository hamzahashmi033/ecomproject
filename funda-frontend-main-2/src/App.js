import React, { useEffect } from "react";
import "./App.css";
import Route from "./routes/index";
import { QueryClient, QueryClientProvider } from "react-query";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactPixel from "react-facebook-pixel";
import config from "./utils/config";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    ReactPixel.init(config.prodFbPixelId, null, {
      autoConfig: true,
      debug: true,
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </>
  );
}

export default App;
