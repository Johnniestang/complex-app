import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import dispatchContext from "../DispatchContext";

import Page from "./Page";

const ViewPost = () => {
  const { id } = useParams();
  const appDispatch = useContext(dispatchContext);

  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await Axios(`/post/${id}`);
        console.log(response.data);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        appDispatch({
          type: "flashMessage",
          value: "An Axios error occurred",
        });
      }
    };

    fetchPost();
  }, []);

  if (isLoading) {
    return <Page title="..."> Loading ...</Page>;
  }

  const date = new Date(post.createdDate);
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {dateFormatted}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
};

export default ViewPost;
