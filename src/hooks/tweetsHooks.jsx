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
          return { ...item.data(), time: timestampFormatter(item.data().time) };
        })
      );
    });

    return () => {
      onSubscribe();
    };
  }, [setTweets]);
};
