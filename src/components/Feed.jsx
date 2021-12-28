import { Tweet } from "./Tweet";
import { SubmitForm } from "./SubmitForm";
import { useTweets } from "../hooks/tweetsHooks";
import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";

export const Feed = () => {
  const { tweets, userID } = useContext(AppContext);
  const [postsView, setPostsView] = useState(true);
  useTweets();

  const handlePostsClick = () => {
    setPostsView(true);
  };
  const handleFavouritesClick = () => {
    setPostsView(false);
  };

  return (
    <div className="feed-container">
      <SubmitForm />
      <h1 className="username">{userID}</h1>
      <div className="tab-selector">
        <div className={`${postsView && "active"}`} onClick={handlePostsClick}>
          POSTS
        </div>
        <div
          className={`${!postsView && "active"}`}
          onClick={handleFavouritesClick}
        >
          FAVOURITES
        </div>
      </div>

      <div className="tweets-container">
        {postsView &&
          tweets !== undefined &&
          tweets.map((item) => {
            return <Tweet key={item.user} data={item} />;
          })}
        {!postsView && <h2>FAVOURITES</h2>}
      </div>
    </div>
  );
};
