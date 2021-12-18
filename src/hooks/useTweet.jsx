import { subscribe } from "../services/operations";
import { useEffect, useState } from "react";

export const useTweet = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const onSusbscribe = subscribe("tweets", async (snapshot) => {
      setTweets(
        snapshot.docs.map((item) => {
          return item.data();
        })
      );
    });

    return () => {
      onSusbscribe();
    };
  }, []);

  return tweets;
};
