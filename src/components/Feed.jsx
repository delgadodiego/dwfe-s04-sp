import { useContext, useState } from "react";
import { appContext } from "../context/AppContext";
import "../css/feed.css";
import {
  useDeleteTweet,
  useSubscribeTweets,
  useLikeTweet,
} from "../hooks/tweetsHooks";
import { SubmitForm } from "./SubmitForm";
import { Tweet } from "./Tweet";

export const Feed = () => {
  const {
    tweets,
    setOkToDelete,
    showDeleteConfirm,
    setShowDeleteConfirm,
    deletePressed,
    setDeletePressed,
  } = useContext(appContext);
  const [postsView, setPostsView] = useState(true);
  useSubscribeTweets();
  useDeleteTweet();
  useLikeTweet();

  document.addEventListener("keydown", getKey);
  function getKey(e) {
    if (deletePressed && e.keyCode === 27) {
      setShowDeleteConfirm(false);
    }
  }

  const handlePostsClick = () => {
    setPostsView(true);
  };
  const handleFavouritesClick = () => {
    setPostsView(false);
  };

  const ConfirmDeletion = () => {
    return (
      <div className="popup-container">
        <div className="popup-bg" />
        <div className="popup-message">
          <h2>Confirmás eliminar este Tweet?</h2>
          <div className="popup-buttons">
            <button onClick={confirmDelete}>OK</button>
            <button onClick={cancelDelete}>CANCEL</button>
          </div>
        </div>
      </div>
    );
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    setDeletePressed(false);
    setOkToDelete(true);
  };

  const cancelDelete = () => {
    setDeletePressed(false);
    setShowDeleteConfirm(false);
    setOkToDelete(false);
  };

  return (
    <div>
      {showDeleteConfirm && <ConfirmDeletion />}
      <div className="feed-container">
        <SubmitForm />
        <h1 className="username">{"CAMBIAR ESTO"}</h1>
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
          {postsView &&
            tweets !== undefined &&
            tweets.map((item) => {
              return <Tweet key={item.id} data={item} />;
            })}
          {!postsView && <h2>FAVOURITES</h2>}
        </div>
      </div>
    </div>
  );
};
