import React from "react";
import { useState } from "react";
import { CONFIGS } from "../utils/configs";

export const SubmitForm = () => {
  const [availableToPost, setAvailableToPost] = useState(false);
  const [tweetText, setTweetText] = useState("");
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
      reset(e);
      // addDoc
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
    <div className="submit-form">
      <h1>Submit Tweets</h1>
      <form onSubmit={handlePost}>
        <textarea
          id="input-area"
          className="input-area"
          type="text"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={CONFIGS.inputPlaceholder}
          value={tweetText}
          maxLength={CONFIGS.maxLength}
        />
        <progress id="progress-bar" max="100" value={percent}></progress>
        <div className="submit-form-bottom">
          <h5>{availableLength}</h5>
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
