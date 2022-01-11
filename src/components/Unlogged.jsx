import google from "../assets/img/cmd_google.svg";
import logo from "../assets/img/logo-big.svg";
import "../css/app.css";
import { signIn } from "../services/auth";
import { CONFIGS } from "../utils/configs";

export function Unlogged() {
  return (
    <>
      <div className="welcome">
        <div className="welcome-logo-container">
          <img src={logo} alt="" className="welcome-logo" />
        </div>
        <div className="welcome-text-container">
          <h1 className="welcome-title">{CONFIGS.welcomeTitle}</h1>
          <h4 className="welcome-text">{CONFIGS.welcomeText}</h4>
          <img
            onClick={signIn}
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
