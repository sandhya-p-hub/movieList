import React, { Component } from "react";

//input : liked - boolean
//o/p : onclick
const LikeComment = props => {
  let classes = "fa fa-heart";

  if (!props.liked)
    return (
      <i
        onClick={props.onClick}
        className={(classes += "-o")}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  return (
    <div>
      <i
        onClick={props.onClick}
        className={classes}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default LikeComment;
