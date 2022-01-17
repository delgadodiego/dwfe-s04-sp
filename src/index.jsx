import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import { AppProvider } from "./context/AppContext";
import { UserProvider } from "./context/UserContext";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
