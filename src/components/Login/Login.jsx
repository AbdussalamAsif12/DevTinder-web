import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";

const Login = () => {
  const [emailId, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post( // Added `await`
        `${BASE_URL}/signup`, // Fixed typo "/signup"
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data)); // Ensure correct response usage
      navigate("/profile");
    } catch (err) { // Fixed error variable name
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <div>
            {!isLoginForm && ( // Fixed condition for signup fields
              <>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email" // Changed from "text" to "email"
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password" // Changed from "text" to "password"
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <hr />

          <p
            className="text-center cursor-pointer my-5 text-xl font-bold"
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {isLoginForm ? "Create an Account" : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
