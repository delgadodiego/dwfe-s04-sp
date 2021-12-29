import { subscribe } from "../services/operations";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/ContextProvider";
import { CONFIGS } from "../utils/configs";
import { timestampFormatter } from "../utils/utils";

export const useTweets = () => {
  const { setTweets } = useContext(AppContext);

  useEffect(() => {
    const onSubscribe = subscribe(CONFIGS.collection, async (snapshot) => {
      setTweets(
        snapshot.docs.map((item) => {
          console.info("item", item._document.key.path.segments[6]);
          return {
            ...item.data(),
            time: timestampFormatter(item.data().time),
            id: item._document.key.path.segments[6],
          };
        })
      );
    });

    return () => {
      onSubscribe();
    };
  }, [setTweets]);
};
