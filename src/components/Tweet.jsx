import trashcan from "../assets/img/trashcan.svg";
import heartfull from "../assets/img/heart-full.svg";
import heartempty from "../assets/img/heart-empty.svg";
import "../css/tweet.css";
import { getDocument } from "../services/operations";

const like = (e) => {
  console.info("liked", e);
  getDocument("tweets", "User 1");
};

const dislike = (e) => {
  console.info("Dislike", e);
};

const handleDelete = () => {
  console.info("Se eliminaría este Tweet...");
};

export const Tweet = (props) => {
  return (
    <div className="tweet">
      <div className="tweet-avatar">
        <h1>{props.data.avatar}</h1>
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
            onClick={handleDelete}
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
                like(props.data.user);
              }}
            />
          ) : (
            <img
              className="heart"
              src={heartfull}
              alt="heartfull"
              onClick={() => {
                dislike(props.data.user);
              }}
            />
          )}
          <div className="tweet-likes">{props.data.likes}</div>
        </div>
      </div>
    </div>
  );
};
