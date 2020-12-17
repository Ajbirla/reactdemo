import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const AddPostForm = (props) => {
  const initialFormState = { id: null, title: "", body: "" };
  const [post, setPost] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!post.title || !post.body) return;

    props.addPost(post);
    setPost(initialFormState);
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
              required={true}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="body"
              value={post.body}
              onChange={handleInputChange}
              required={true}
              className="form-control"
            />
          </div>
          <button class="btn-success">Add new post</button>
        </form>
      )}
    </>
  );
};

export default AddPostForm;
