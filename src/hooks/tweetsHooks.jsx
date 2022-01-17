import { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
import { userContext } from "../context/UserContext";
import {
  deleteTweet,
  subscribe,
  updateTweetStats,
  updateUserLikedTweets,
} from "../services/operations";
import { CONFIGS } from "../utils/configs";
import { timestampFormatter } from "../utils/utils";

export const useSubscribeTweets = () => {
  const { setTweets } = useContext(appContext);
  const { user } = useContext(userContext);

  useEffect(() => {
    if (user !== null) {
      const onSubscribe = subscribe(
        CONFIGS.collectionTweets,
        async (snapshot) => {
          setTweets(
            snapshot.docs.map((item) => {
              return {
                ...item.data(),
                timeToShow: timestampFormatter(item.data().time),
                liked: user.likedTweets.indexOf(item.data().id) > 0,
              };
            })
          );
        }
      );

      return () => {
        onSubscribe();
      };
    }
  }, [setTweets, user]);
};

export const useDeleteTweet = () => {
  const { okToDelete, setOkToDelete, setShowDeleteConfirm, tweetToDelete } =
    useContext(appContext);

  useEffect(() => {
    if (okToDelete) {
      setOkToDelete(false);
      setShowDeleteConfirm(false);
      deleteTweet(CONFIGS.collectionTweets, tweetToDelete);
    }
  });
};

export const useLikeTweet = () => {
  const { currentTweet, like, setLikedTweet } = useContext(appContext);
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    if (currentTweet) {
      const newLikedTweets = updateUserLikedTweets(
        CONFIGS.collectionUsers,
        user,
        currentTweet,
        like
      );
      updateUser(user, setUser, newLikedTweets);

      updateTweetStats(CONFIGS.collectionTweets, currentTweet, like);
      setLikedTweet([undefined, null]);
    }
  });
};

const updateUser = async (user, setUser, newLikedTweets) => {
  await setUser({ ...user, likedTweets: await newLikedTweets });
};
