import { createContext, useState } from "react";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");
  const [userData, setUserData] = useState({});
  const [availableToPost, setAvailableToPost] = useState(false);
  const [okToDelete, setOkToDelete] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tweetToDelete, setTweetToDelete] = useState(undefined);
  const [deletePressed, setDeletePressed] = useState(false);
  const [[tweet, like], setLikedTweet] = useState([undefined, null]);

  return (
    <appContext.Provider
      value={{
        tweets,
        setTweets,
        tweetText,
        setTweetText,
        userData,
        setUserData,
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
        tweet,
        like,
        setLikedTweet,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
