import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { RingLoader } from "react-spinners";
import dispatchContext from "../DispatchContext";

import Axios from "axios";

const ProfilePosts = () => {
  const { username } = useParams();
  const appDispatch = useContext(dispatchContext);

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios(`/profile/${username}/posts`);
        console.log(response.data);
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        appDispatch({
          type: "flashMessage",
          value: "An Axios error occurred",
        });
      }
    };

    fetchPosts();
  }, []);

  //   useEffect(() => {

  //   }, [posts]);

  const showPosts = () => {
    return posts.map((post, index) => {
      const date = new Date(post.createdDate);
      const dateFormatted = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;

      return (
        <Link
          key={post._id}
          to={`/post/${post._id}`}
          className="list-group-item list-group-item-action"
        >
          <img
            className="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />{" "}
          <strong>{post.title}</strong>{" "}
          <span className="text-muted small">{`on ${dateFormatted} `}</span>
        </Link>
      );
    });
  };

  if (isLoading) return <RingLoader color="#36d7b7" />;
  return <div className="list-group">{showPosts()}</div>;
};

export default ProfilePosts;
