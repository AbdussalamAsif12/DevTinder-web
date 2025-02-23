import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/requestSlice";
import axios from "axios";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length == 0) return <h1>No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl font-mono text-white">Requests</h1>
      {requests.map((requests) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          requests.fromUserId;
        const { status } = requests;
        return (
          <div
            key={_id}
            className="flex  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="user Profile Pic"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>About : {about}</p>
              <p>Age : {age}</p>
              <p>Gender : {gender}</p>
              <p className="capitalize">status : {status}</p>
              <div className="my-5 ">
              <button className="btn btn-secondary text-xl font-sans">Accept</button>
              <button className="btn btn-accent  mx-5 text-xl font-sans">Reject</button>
            </div>
            </div>
            
          </div>
          
        );
      })}
    </div>
  );
};

export default Request;
