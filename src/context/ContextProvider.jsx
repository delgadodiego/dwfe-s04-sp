import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState("");

  return (
    <AppContext.Provider
      value={{ tweets, setTweets, userData, setUserData, userID, setUserID }}
    >
      {children}
    </AppContext.Provider>
  );
};
