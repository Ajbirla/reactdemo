import React, { useState } from "react";

const AddPostForm = (props) => {
  const initialFormState = { id: null, title: "", body: "" };
  const [post, setPost] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPost({ ...post, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!post.title || !post.body) return;

        props.addPost(post);
        setPost(initialFormState);
      }}
    >
      <label>Title</label>
      <textarea name="title" value={post.title} onChange={handleInputChange} />
      <label>Description</label>
      <textarea name="body" value={post.body} onChange={handleInputChange} />
      <button>Add new post</button>
    </form>
  );
};

export default AddPostForm;
