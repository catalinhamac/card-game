import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { DepsProvider } from "./context/DepsContext";
import { servicesFactory } from "./services/servicesFactory";
import { App } from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DepsProvider servicesFactory={servicesFactory}>
        <App />
      </DepsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
