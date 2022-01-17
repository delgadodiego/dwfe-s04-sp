import { useContext, useEffect } from "react";
import { userContext } from "../context/UserContext";
import { userSetup } from "../services/operations";
import { CONFIGS } from "../utils/configs";
import { useNavigate } from "react-router-dom";

export const useUserSetup = () => {
  const {
    user,
    setUser,
    username,
    selectedColor,
    availableToPost,
    setAvailableToPost,
  } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (availableToPost) {
      userSetup(CONFIGS.collectionUsers, user, username, selectedColor);
      setUser({ ...user, username: username, color: selectedColor });
      setAvailableToPost(false);
      navigate("/feed");
    }
  }, [
    availableToPost,
    setAvailableToPost,
    user,
    username,
    selectedColor,
    setUser,
    navigate,
  ]);
};

export const userRedirects = (user, navigate) => {
  if (user !== null && user !== undefined) {
    if (user.username !== "" && user.color !== "") {
      navigate("/feed");
    } else {
      navigate("/welcome");
    }
  } else {
    navigate("/");
  }
};
