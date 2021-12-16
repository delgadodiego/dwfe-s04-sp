import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/ContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
