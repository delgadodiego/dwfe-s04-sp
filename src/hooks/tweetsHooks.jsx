import { subscribe, deleteTweet, updateTweet } from "../services/operations";
import { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
import { userContext } from "../context/UserContext";
import { CONFIGS } from "../utils/configs";
import { timestampFormatter } from "../utils/utils";

export const useSubscribeTweets = () => {
  const { setTweets } = useContext(appContext);

  useEffect(() => {
    const onSubscribe = subscribe(
      CONFIGS.collectionTweets,
      async (snapshot) => {
        setTweets(
          snapshot.docs.map((item) => {
            console.log("item ID", item._document.key.path.segments[6]);
            return {
              ...item.data(),
              time: timestampFormatter(item.data().time),
            };
          })
        );
      }
    );

    return () => {
      onSubscribe();
    };
  }, [setTweets]);
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
  const { tweet, like, setLikedTweet } = useContext(appContext);
  const user = useContext(userContext);
  useEffect(() => {
    if (tweet) {
      updateTweet(CONFIGS.collectionUsers, user.uid, tweet, like);
      setLikedTweet([undefined, null]);
    }
  });
};
