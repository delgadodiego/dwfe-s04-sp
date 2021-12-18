import { Tweet } from "./Tweet";
import { useTweet } from "../hooks/useTweet";

export const Feed = () => {
  const tweets = useTweet();

  return (
    <div>
      {tweets !== undefined &&
        tweets.map((item) => {
          return <Tweet key={Math.random()} data={item} />;
        })}
    </div>
  );
};
