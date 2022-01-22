import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-small.svg";
import text from "../assets/img/logo-text.svg";
import { ConfirmDeletion } from "../components/ConfirmDeletion";
import { Loading } from "../components/Loading";
import { appContext } from "../context/AppContext";
import { userContext } from "../context/UserContext";
import "../css/feed.css";
import {
  useDeleteTweet,
  useLikeTweet,
  useSubscribeTweets,
} from "../hooks/tweetsHooks";
import { SubmitForm } from "./SubmitForm";
import { Tweet } from "./Tweet";

export const Feed = () => {
  const { tweets, showDeleteConfirm, setShowDeleteConfirm, deletePressed } =
    useContext(appContext);
  const { user } = useContext(userContext);

  useSubscribeTweets();
  useDeleteTweet();
  useLikeTweet();

  document.addEventListener("keydown", getKey);
  function getKey(e) {
    if (deletePressed && e.keyCode === 27) {
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div className="global-container">
      {showDeleteConfirm && <ConfirmDeletion />}

      {user === null || tweets === [] ? (
        <Loading />
      ) : (
        <div className="content-container">
          <div className="header-container">
            <div className="header">
              <Link to="/profile" className="header-item uno">
                <div>
                  <img
                    className={"header-user profile-" + user.color}
                    src={user.photoURL}
                    alt="user"
                  />
                </div>
              </Link>
              <div className="header-item">
                <img className="header-logo" src={logo} alt="logo" />
              </div>
              <div className="header-item tres">
                <img className="header-text" src={text} alt="text" />
              </div>
            </div>
          </div>

          <div className="submit-container">
            <div className="submit-content-container">
              <img src={user.photoURL} alt="user-avatar" className="avatar" />
              <SubmitForm />
            </div>
          </div>

          <div className="feed-container">
            <div className="tweets-container">
              {tweets !== undefined &&
                tweets.map((item) => {
                  return <Tweet key={item.id} data={item} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
