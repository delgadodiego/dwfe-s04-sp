import logo from "../assets/img/logo-big.svg";
import google from "../assets/img/cmd_google.svg";
import { signIn } from "../services/auth";
import "../css/app.css";

export function Unlogged() {
  return (
    <>
      <div className="welcome">
        <div className="welcome-logo-container">
          <img src={logo} alt="" className="welcome-logo" />
        </div>
        <div className="welcome-text-container">
          <h1 className="welcome-title">WELCOME !</h1>
          <h4 className="welcome-text">
            the place to share all your nerd stuff
          </h4>
          <img
            onClick={signIn}
            className="google-login"
            width="200px"
            src={google}
            alt=""
          />
          <h3 className="copyright">
            © 2022 Devs_United -<span className="highlighted">BETA</span>
          </h3>
        </div>
      </div>
    </>
  );
}
