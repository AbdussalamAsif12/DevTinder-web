import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;
  if (connections.length == 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl font-mono text-white">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div key={_id} className="flex  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
