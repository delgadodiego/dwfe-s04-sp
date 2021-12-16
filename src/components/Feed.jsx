import { getData } from "../utils/operations";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/ContextProvider";
import { Tweet } from "./Tweet";
import { CONFIGS } from "../utils/configs";

export const Feed = () => {
  const { tweets, setTweets } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const currentTweets = await getData(CONFIGS.collection);
      setTweets(currentTweets);
    }
    fetchData();
  }, [setTweets]);

  return (
    <div>
      {tweets !== undefined &&
        tweets.map((item) => {
          return <Tweet key={Math.random()} data={item} />;
        })}
    </div>
  );
};
