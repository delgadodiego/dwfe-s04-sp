import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-big.svg";
import { userContext } from "../context/UserContext";
import { CONFIGS } from "../utils/configs";

export const Welcome = () => {
  const {
    user,
    setUsername,
    selectedColor,
    setSelectedColor,
    setAvailableToPost,
  } = useContext(userContext);
  const [okToPostColor, setOKtoPostColor] = useState(false);
  const [okToPostUser, setOKtoPostUser] = useState(false);

  const handleColorChange = (color) => {
    if (color !== selectedColor) {
      setSelectedColor(color);
      setOKtoPostColor(true);
    } else {
      setSelectedColor(undefined);
      setOKtoPostColor(false);
    }
  };
  const handleUsernameChange = (e) => {
    setOKtoPostUser(false);
    if (e.target.value !== "") {
      setUsername(e.target.value);
      setOKtoPostUser(true);
    }
  };

  const postUser = () => {
    setAvailableToPost(true);
  };

  return (
    <>
      <div className="welcome">
        <div className="welcome-logo-container">
          <img src={logo} alt="" className="welcome-logo" />
        </div>
        <div className="welcome-text-container">
          <h1 className="welcome-title">{CONFIGS.welcomeTitle}</h1>
          {user !== undefined ?? <h4 className="welcome-text">{user.name}</h4>}
          <input
            type="text"
            name="username"
            id="username"
            placeholder={CONFIGS.inputUsername}
            onChange={handleUsernameChange}
            autoComplete="off"
          />
          <h3 className="text-colors">{CONFIGS.favouriteColor}</h3>
          <div className="container-colors">
            <div
              className={`color red ${
                selectedColor === "red" ? "selected" : null
              }`}
              onClick={() => handleColorChange("red")}
            ></div>
            <div
              className={`color orange ${
                selectedColor === "orange" ? "selected" : null
              }`}
              onClick={() => handleColorChange("orange")}
            ></div>
            <div
              className={`color yellow ${
                selectedColor === "yellow" ? "selected" : null
              }`}
              onClick={() => handleColorChange("yellow")}
            ></div>
            <div
              className={`color green ${
                selectedColor === "green" ? "selected" : null
              }`}
              onClick={() => handleColorChange("green")}
            ></div>
            <div
              className={`color blue ${
                selectedColor === "blue" ? "selected" : null
              }`}
              onClick={() => handleColorChange("blue")}
            ></div>
            <div
              className={`color violet ${
                selectedColor === "violet" ? "selected" : null
              }`}
              onClick={() => handleColorChange("violet")}
            ></div>
          </div>
          <div className="continue-bottom">
            <button
              id="continue-button"
              value="continue"
              onClick={postUser}
              disabled={!okToPostUser || !okToPostColor}
            >
              CONTINUE
            </button>
          </div>
          <h3 className="copyright">
            {CONFIGS.copyright} -<span className="highlighted">BETA</span>
          </h3>
        </div>
      </div>
      <Link to="/feed">
        <div>Acceso al Feed</div>
      </Link>
    </>
  );
};
