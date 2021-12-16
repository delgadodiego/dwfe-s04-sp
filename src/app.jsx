import logo from "./img/logo-big.svg";
import "./css/app.css";
import React from "react";
import { Feed } from "./components/Feed";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="" className="header-logo" />
        <Feed />
      </header>
    </div>
  );
}

export default App;
