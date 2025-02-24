import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constant";
import { removeUserFromFeed } from "../../utils/feedSlice";
import { useDispatch } from "react-redux";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const hadnleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>AGE : {age}</p>
          <p>Gender : {gender}</p>
          <h4>About : {about} </h4>
          <hr />
          <div className="card-actions justify-between my-5">
            <button
              className="btn btn-primary"
              onClick={() => hadnleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => hadnleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
