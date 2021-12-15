import logo from "./img/logo-big.svg";
import "./css/app.css";
import React, { useEffect } from "react";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="" className="header-logo" />
      </header>
    </div>
  );
}

export default App;
