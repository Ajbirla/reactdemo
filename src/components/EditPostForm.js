import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const EditPostForm = (props) => {
  const [post, setPost] = useState(props.currentPost);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setPost(props.currentPost);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    props.updatePost(post.id, post);
  };

  return (
    <>
      {submitted ? (
        <Redirect to="/posts" />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <textarea
              name="title"
              value={post.title}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="body"
              value={post.body}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button className="btn-secondary">Update post</button>
        </form>
      )}
    </>
  );
};

export default EditPostForm;
