import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import theme from "../theme.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <App />
    </HelmetProvider>
    </ChakraProvider>
  </React.StrictMode>
);
