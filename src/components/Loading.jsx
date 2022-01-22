import React from "react";
import loading from "../assets/img/loading.svg";
import "../css/app.css";
import "../css/feed.css";

export const Loading = () => {
  return (
    <div className="popup-container">
      <div className="popup-bg" />
      <img className="loading" src={loading} alt="Loading..." />
    </div>
  );
};
