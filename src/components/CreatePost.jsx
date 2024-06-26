import React, { useEffect, useState, useContext } from "react";
import Page from "./Page";
import { useNavigate } from "react-router-dom";

import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

import Axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const handleNewPost = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("/create-post", {
        title,
        body,
        token: appState.user.token,
      });
      console.log(response);
      console.log("New Post was created");
      appDispatch({
        type: "flashMessage",
        value: "New Post successfully created",
      });
      navigate(`/post/${response.data}`);

      // Redirect to new Post URL
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Create new post">
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
        </div>

        <button onClick={handleNewPost} className="btn btn-primary">
          Save New Post
        </button>
      </form>
    </Page>
  );
};

export default CreatePost;
