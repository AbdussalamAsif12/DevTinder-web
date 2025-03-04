import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import UserCard from "../userCard/UserCard";
import axios from "axios";
const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setgender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      {showToast && (
        <div role="alert" className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Profile Update Successfully.</span>
        </div>
      )}

      <div className="flex justify-center  my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">First Name : </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name : </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">PhotoUrl : </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={photoUrl}
                    onChange={(e) => setphotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age : </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender : </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About : </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
