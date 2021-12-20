import { Link } from "react-router-dom";
import logo from "../assets/img/logo-big.svg";

export const Welcome = () => {
  return (
    <>
      <div className="welcome">
        <div className="welcome-logo-container">
          <img src={logo} alt="" className="welcome-logo" />
        </div>
        <div className="welcome-text-container">
          <h1 className="welcome-text">WELCOME !</h1>
        </div>
      </div>
      <Link to="/feed">
        <div>Acceso al Feed</div>
      </Link>
    </>
  );
};
