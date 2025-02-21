import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-success">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
