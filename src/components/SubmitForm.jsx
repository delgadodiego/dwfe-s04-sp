import React, { useContext, useState } from "react";
import { appContext } from "../context/AppContext";
import { userContext } from "../context/UserContext";
import "../css/forms.css";
import { postTweet } from "../services/operations";
import { CONFIGS } from "../utils/configs";

export const SubmitForm = () => {
  const { availableToPost, setAvailableToPost, tweetText, setTweetText } =
    useContext(appContext);

  const { user } = useContext(userContext);

  const [availableLength, setAvailableLength] = useState(CONFIGS.maxLength);
  const percent = 100 - (availableLength * 100) / CONFIGS.maxLength;

  const handleFocus = (e) => {
    e.target.placeholder = "";
  };
  const handleBlur = (e) => {
    if (e.target.value === "" || e.target.value === undefined) {
      e.target.placeholder = CONFIGS.inputPlaceholder;
    }
  };

  const handleChange = (e) => {
    setAvailableToPost(false);
    setTweetText(e.target.value);
    setAvailableLength(e.target.maxLength - e.target.value.length);
    if (e.target.value !== "") {
      setAvailableToPost(true);
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (availableToPost) {
      const tweetToPost = {
        uid: user.uid,
        name: user.username === "" ? user.name : user.username,
        photoURL: user.photoURL,
        text: tweetText,
        likes: 0,
        time: new Date(),
      };

      postTweet(CONFIGS.collectionTweets, tweetToPost);
      reset(e);
    }
  };

  const reset = (e) => {
    setTweetText("");
    setAvailableToPost(false);
    setAvailableLength(CONFIGS.maxLength);
    e.target.placeholder = CONFIGS.inputPlaceholder;
    document.getElementById("input-area").focus();
  };

  return (
    <div className="submit-form-container">
      <form className="submit-form" onSubmit={handlePost}>
        <textarea
          id="input-area"
          className="input-area"
          type="text"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={CONFIGS.inputPlaceholder}
          maxLength={CONFIGS.maxLength}
          value={tweetText}
        />
        <progress id="progress-bar" max="100" value={percent}></progress>
        <div className="submit-form-bottom">
          <h5 className="available-length">{availableLength}</h5>
          <div className="form-buttons">
            <button
              id="post-button"
              value="PostTweet"
              disabled={!availableToPost}
            >
              POST
            </button>
            <button id="reset-button" value="Reset" onClick={reset}>
              RESET
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
