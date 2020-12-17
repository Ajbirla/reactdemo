import "./App.css";
import React, { useState, useEffect, Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";
import PostService from "./services/PostService";
import PostTable from "./components/PostTable";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const initialFormState = { id: null, title: "", body: "" };
  const [posts, setPosts] = useState([]);

  const [currentPost, setCurrentPost] = useState(initialFormState);

  useEffect(() => {
    retrivePosts();
  }, []);

  const retrivePosts = () => {
    PostService.getAll()
      .then((response) => {
        console.log("then block");
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addPost = (post) => {
    post.id = posts.length + 1;
    PostService.create(post)
      .then((response) => {
        console.log(`Created successfully with status ${response.status}`);
        setPosts([...posts, post]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePost = (id) => {
    PostService.remove(id)
      .then((response) => {
        console.log(`deleted successfully with status ${response.status}`);
        setPosts(posts.filter((post) => post.id != id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePost = (id, updatedPost) => {
    PostService.update(id, updatedPost)
      .then((response) => {
        console.log(`Updated successfully with status ${response.status}`);
        setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editRow = (post) => {
    setCurrentPost({
      id: post.id,
      title: post.title,
      body: post.body,
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          HooksDemo
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/posts"} className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/posts"]}>
            <PostTable
              posts={posts}
              editRow={editRow}
              deletePost={deletePost}
            />
          </Route>
          <Route exact path="/add">
            <AddPostForm addPost={addPost} />
          </Route>
          <Route path="/posts/:id">
            <EditPostForm currentPost={currentPost} updatePost={updatePost} />
          </Route>
        </Switch>
      </div>
    </div>
    // <div className="container">
    //   <h1>CRUD App with Hooks</h1>
    //   <div className="flex-row">
    //     <div className="flex-large">
    //       {editing ? (
    //         <Fragment>
    //           <h2>Edit post</h2>
    //           <EditPostForm
    //             editing={editing}
    //             setEditing={setEditing}
    //             currentPost={currentPost}
    //             updatePost={updatePost}
    //           />
    //         </Fragment>
    //       ) : (
    //         <Fragment>
    //           <h2>Add Post</h2>
    //           <AddPostForm addPost={addPost} />
    //         </Fragment>
    //       )}
    //     </div>
    //     <div className="flex-large">
    //       <h2>Post List</h2>
    //       <PostTable posts={posts} editRow={editRow} deletePost={deletePost} />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
