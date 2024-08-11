import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/login");
      console.log("Logged in Successfully");

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  return (
    <div className=" min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form action="" onSubmit={submitHandler}>
          <div>
            <label className=" label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="full Name"
              className="w-full input input-bordered h-10"
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            />
          </div>

          <div>
            <label className=" label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered h-10"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div>
            <label className=" label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div>
            <label className=" label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                className="checkbox mx-3"
                onChange={() => handleCheckbox("male")}
              />
            </div>

            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                className="checkbox mx-3"
                onChange={() => handleCheckbox("female")}
              />
            </div>
          </div>

          <p className="text-center my-2">
            Already have an account ? <Link to="/login"> Login</Link>{" "}
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
