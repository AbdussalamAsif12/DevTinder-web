import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "../userCard/UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  if (feed.length <= 0) return <h1 className="text-center bg-gray-600 text-4xl py-5 text-white">(0) User's Found</h1>;

  return (
    feed && (
      <>
        <div className="flex justify-center my-10">
          <UserCard user={feed[0]} />
        </div>
      </>
    )
  );
};

export default Feed;
