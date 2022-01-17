import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import back from "../assets/img/back.svg";
import logoutIcon from "../assets/img/logout-icon.svg";
import { ConfirmDeletion } from "../components/ConfirmDeletion";
import { appContext } from "../context/AppContext";
import { userContext } from "../context/UserContext";
import "../css/app.css";
import "../css/feed.css";
import "../css/profile.css";
import {
  useDeleteTweet,
  useLikeTweet,
  useSubscribeTweets,
} from "../hooks/tweetsHooks";
import { signOut } from "../services/auth";
import { Tweet } from "./Tweet";

export const Profile = () => {
  const [postsView, setPostsView] = useState(true);
  const [tweetsPosts, setTweetsPosts] = useState(undefined);
  const [tweetsFavs, setTweetsFavs] = useState(undefined);
  const { user } = useContext(userContext);
  const { tweets, showDeleteConfirm } = useContext(appContext);

  useSubscribeTweets();
  useDeleteTweet();
  useLikeTweet();

  const handleLogout = () => {
    signOut();
  };

  const handlePostsClick = () => {
    setPostsView(true);
  };
  const handleFavouritesClick = () => {
    setPostsView(false);
  };

  useEffect(() => {
    if (postsView) {
      const posts = tweets.filter((item) => {
        return item.uid === user.uid;
      });
      setTweetsPosts(posts);
      setTweetsFavs(undefined);
    } else {
      const favs = tweets.filter((item) => {
        return user.likedTweets.indexOf(item.id) > 0;
      });
      setTweetsFavs(favs);
      setTweetsPosts(undefined);
    }
  }, [postsView, tweets]);

  return (
    <>
      {showDeleteConfirm && <ConfirmDeletion />}

      <div className="top-bar">
        <Link to="/feed" className="back-link">
          <img src={back} alt="back" className="back-button" />
          <h2 className="header-username">{user.username}</h2>
        </Link>

        <div className="logout-button" onClick={handleLogout}>
          <span className="logout-text">LOGOUT</span>
          <img height="20px" src={logoutIcon} alt="" />
        </div>
      </div>
      <div className="main">
        <img
          className={"profile-user " + user.color}
          src={user.photoURL}
          alt="user"
        />
        {user !== null && (
          <h1 className={"username " + user.color}>{user.username}</h1>
        )}

        <div className="tab-selector">
          <div
            className={`${postsView && "active"}`}
            onClick={handlePostsClick}
          >
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
          {tweetsPosts &&
            tweetsPosts !== undefined &&
            tweetsPosts.map((item) => {
              return <Tweet key={item.id} data={item} />;
            })}
          {tweetsFavs &&
            tweetsFavs !== undefined &&
            tweetsFavs.map((item) => {
              return <Tweet key={item.id} data={item} />;
            })}
        </div>
      </div>
    </>
  );
};
