import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState("USERNAME");
  const [availableToPost, setAvailableToPost] = useState(false);

  return (
    <AppContext.Provider
      value={{
        tweets,
        setTweets,
        tweetText,
        setTweetText,
        userData,
        setUserData,
        userID,
        setUserID,
        availableToPost,
        setAvailableToPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
