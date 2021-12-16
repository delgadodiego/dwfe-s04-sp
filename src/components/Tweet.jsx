import React from "react";

export const Tweet = (props) => {
  return (
    <div>
      <h2>{props.data.user}</h2>
      <h4>{props.data.text}</h4>
    </div>
  );
};
