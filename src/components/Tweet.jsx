export const Tweet = (props) => {
  return (
    <div className="tweet">
      <div className="tweet-avatar">
        <h1>{props.data.avatar}</h1>
      </div>
      <div className="tweet-body">
        <div className="tweet-header">
          <h3>{props.data.user}</h3>
          <span>-</span>
          <h4>{props.data.time}</h4>
        </div>
        <div className="tweet-text">{props.data.text}</div>
        <div className="tweet-likes">{props.data.likes}</div>
      </div>
    </div>
  );
};
