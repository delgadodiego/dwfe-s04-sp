import { useContext } from "react";
import heartempty from "../assets/img/heart-empty.svg";
import heartfull from "../assets/img/heart-full.svg";
import trashcan from "../assets/img/trashcan.svg";
import { appContext } from "../context/AppContext";
import { userContext } from "../context/UserContext";
import "../css/tweet.css";

export const Tweet = (props) => {
  const {
    setShowDeleteConfirm,
    setTweetToDelete,
    setDeletePressed,
    setLikedTweet,
  } = useContext(appContext);
  const { user } = useContext(userContext);

  const handleLike = (tweet) => {
    setLikedTweet([tweet, true]);
  };

  const handleDislike = (tweet) => {
    setLikedTweet([tweet, false]);
  };

  const handleDelete = (id) => {
    setDeletePressed(true);
    setShowDeleteConfirm(true);
    setTweetToDelete(id);
  };

  return (
    <div className="tweet">
      {props.data.name !== null && (
        <>
          <div className="tweet-avatar">
            <img className="avatar" src={props.data.photoURL} alt="" />
          </div>
          <div className="tweet-body">
            <div className="tweet-header">
              <div className="tweet-header-text">
                {user.uid === props.data.uid ? (
                  <h3
                    className="tweet-username"
                    style={{ background: user.color }}
                  >
                    {props.data.name}
                  </h3>
                ) : (
                  <h3
                    className="tweet-username"
                    style={{ background: "white" }}
                  >
                    {props.data.name}
                  </h3>
                )}
                <span>-</span>
                <h4 className="tweet-date">{props.data.timeToShow}</h4>
              </div>
              {user.uid === props.data.uid && (
                <img
                  className="trashcan"
                  src={trashcan}
                  alt="trashcan"
                  onClick={() => handleDelete(props.data.id)}
                />
              )}
            </div>
            <div className="tweet-text">{props.data.text}</div>
            <div className="tweet-bottom">
              {!props.data.liked ? (
                <img
                  className="heart"
                  src={heartempty}
                  alt="heartempty"
                  onClick={() => {
                    handleLike(props.data);
                  }}
                />
              ) : (
                <img
                  className="heart"
                  src={heartfull}
                  alt="heartfull"
                  onClick={() => {
                    handleDislike(props.data);
                  }}
                />
              )}
              <div className="tweet-likes">{props.data.likes}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
