import { useContext } from "react";
import avatar01 from "../assets/avatars/01.svg";
import heartempty from "../assets/img/heart-empty.svg";
import heartfull from "../assets/img/heart-full.svg";
import trashcan from "../assets/img/trashcan.svg";
import { appContext } from "../context/AppContext";
import "../css/tweet.css";

export const Tweet = (props) => {
  const { setShowDeleteConfirm, setTweetToDelete, setDeletePressed } =
    useContext(appContext);

  const like = (user, id) => {
    console.info("Like", user, id);
  };

  const dislike = (user, id) => {
    console.info("Dislike", user, id);
  };

  const handleDelete = (id) => {
    setDeletePressed(true);
    setShowDeleteConfirm(true);
    setTweetToDelete(id);
  };

  return (
    <div className="tweet">
      <div className="tweet-avatar">
        <img className="avatar" src={avatar01} alt="" />
      </div>
      <div className="tweet-body">
        <div className="tweet-header">
          <div className="tweet-header-text">
            <h3>{props.data.user}</h3>
            <span>-</span>
            <h4>{props.data.time}</h4>
          </div>
          <img
            className="trashcan"
            src={trashcan}
            alt="trashcan"
            onClick={() => handleDelete(props.data.id)}
          />
        </div>
        <div className="tweet-text">{props.data.text}</div>
        <div className="tweet-bottom">
          {props.data.likes === 0 || props.data.likes === undefined ? (
            <img
              className="heart"
              src={heartempty}
              alt="heartempty"
              onClick={() => {
                like(props.data.user, props.data.id);
              }}
            />
          ) : (
            <img
              className="heart"
              src={heartfull}
              alt="heartfull"
              onClick={() => {
                dislike(props.data.user, props.data.id);
              }}
            />
          )}
          <div className="tweet-likes">{props.data.likes}</div>
        </div>
      </div>
    </div>
  );
};
