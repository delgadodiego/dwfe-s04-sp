import { subscribe, deleteTweet } from "../services/operations";
import { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
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
            return {
              ...item.data(),
              time: timestampFormatter(item.data().time),
              id: item._document.key.path.segments[6],
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
