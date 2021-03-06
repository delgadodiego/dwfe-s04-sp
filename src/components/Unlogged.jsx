import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../assets/img/cmd_google.svg";
import logo from "../assets/img/logo-big.svg";
import { Loading } from "../components/Loading";
import { userContext } from "../context/UserContext";
import "../css/app.css";
import { userRedirects } from "../hooks/userHooks";
import { signIn } from "../services/auth";
import { CONFIGS } from "../utils/configs";

export function Unlogged() {
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    userRedirects(user, navigate);
  }, [user, navigate]);

  const handleSignIn = () => {
    signIn();
    setLoading(true);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="welcome">
        <div className="welcome-logo-container">
          <img src={logo} alt="" className="welcome-logo" />
        </div>
        <div className="welcome-text-container">
          <h1 className="welcome-title">{CONFIGS.welcomeTitle}</h1>
          <h4 className="welcome-text">{CONFIGS.welcomeText}</h4>
          <img
            onClick={handleSignIn}
            className="google-login"
            width="200px"
            src={google}
            alt=""
          />
          <h3 className="copyright">
            {CONFIGS.copyright} -<span className="highlighted">BETA</span>
          </h3>
        </div>
      </div>
    </>
  );
}
