import React from "react";
import { useState } from "react";

export const CommentContext = React.createContext();
export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState([]);

  const getComments = () => {
    return fetch("http://localhost:8000/comments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("app_user_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setComments);
  };
  const addComment = (comment) => {
    return fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("app_user_id")}`,
      },
      body: JSON.stringify(comment),
    }).then(getComments);
  };

  const getCommentsByPostId = (postId) => {
    return fetch(`http://localhost:8000/comments?post_id=${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("app_user_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setPostComments);
  };
  const deleteComment = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("app_user_id")}`,
      },
    }).then(getComments);
  };

  const editComment = (newComment) => {
    return fetch(`http://localhost:8000/comments/${newComment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("app_user_id")}`,
      },
      body: JSON.stringify(newComment),
    }).then(getComments);
  };
  return (
    <CommentContext.Provider
      value={{
        comments,
        postComments,
        editComment,
        setPostComments,
        setComments,
        addComment,
        getComments,
        getCommentsByPostId,
        deleteComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
