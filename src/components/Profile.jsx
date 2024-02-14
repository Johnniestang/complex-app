import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Page from "./Page";
import ProfilePosts from "./ProfilePosts";

import Axios from "axios";
import stateContext from "../StateContext";

const Profile = () => {
  const appState = useContext(stateContext);
  const { username } = useParams();
  const [profileData, setProfileData] = useState({
    counts: { postCount: "", followingCount: "", followerCount: "" },
    isFollowing: false,
    profileAvatar: "https:/gravatar.com/avatar/placeholder?s=128",
    profileUsername: "...",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.post(`/profile/${username}`, {
          token: appState.user.token,
        });
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} />{" "}
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts />
    </Page>
  );
};

export default Profile;
