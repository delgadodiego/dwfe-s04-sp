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

import { Loading } from "../components/Loading";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
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
    setActiveTab("posts");
  };
  const handleFavouritesClick = () => {
    setActiveTab("favs");
  };

  useEffect(() => {
    console.info("usuario use effect");
    if (user !== null) {
      console.info("usuario OK");
      if (activeTab === "posts") {
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
    } else {
      console.info("usuario null");
    }
  }, [activeTab, tweets, user.likedTweets, user.uid, user]);

  return (
    <>
      {showDeleteConfirm && <ConfirmDeletion />}

      {user === null ? (
        <Loading />
      ) : (
        <>
          <div className="content-container">
            <div className="header-container">
              <div className="header">
                <Link to="/feed" className="back-link">
                  <img src={back} alt="back" className="back-button" />
                  <h2 className="header-username">{user.username}</h2>
                </Link>

                <Link to="/">
                  <div className="logout-button" onClick={handleLogout}>
                    <span className="logout-text">LOGOUT</span>
                    <img height="20px" src={logoutIcon} alt="" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="profile-container">
              <div className="profile-main">
                <img
                  className={"profile-image profile-" + user.color}
                  src={user.photoURL}
                  alt="user"
                />
                {user !== null && (
                  <h1 className={"username " + user.color}>{user.username}</h1>
                )}

                <div className="tab-selector">
                  <div
                    className={`${activeTab === "posts" && "active"}`}
                    onClick={handlePostsClick}
                  >
                    POSTS
                  </div>
                  <div
                    className={`${activeTab === "favs" && "active"}`}
                    onClick={handleFavouritesClick}
                  >
                    FAVOURITES
                  </div>
                </div>
              </div>
            </div>
            <div className="feed-container">
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
          </div>
        </>
      )}
    </>
  );
};
