import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function truncate(str) {
  return str.length > 40 ? str.substring(0, 35) + "..." : str;
}

const PostTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.posts.length > 0 ? (
          props.posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{truncate(post.title)}</td>
              <td>{truncate(post.body)}</td>
              <td>
                <Link
                  to={"/posts/" + post.id}
                  className="btn btn-warning"
                  onClick={() => {
                    props.editRow(post);
                  }}
                >
                  Edit
                </Link>
                <button
                  className="btn-danger"
                  onClick={() => props.deletePost(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No posts</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PostTable;
