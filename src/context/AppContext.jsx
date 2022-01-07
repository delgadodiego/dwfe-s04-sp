import { createContext, useState } from "react";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState("USERNAME");
  const [availableToPost, setAvailableToPost] = useState(false);
  const [okToDelete, setOkToDelete] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tweetToDelete, setTweetToDelete] = useState(undefined);
  const [deletePressed, setDeletePressed] = useState(false);

  return (
    <appContext.Provider
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
        okToDelete,
        setOkToDelete,
        showDeleteConfirm,
        setShowDeleteConfirm,
        tweetToDelete,
        setTweetToDelete,
        deletePressed,
        setDeletePressed,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
