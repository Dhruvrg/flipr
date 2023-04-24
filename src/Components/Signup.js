import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="text-white px-[10vw] md:px-[0vw] md:w-[30vw] md:mx-auto mt-[15vh]"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-x-4 mt-[20px]">
        <label className="w-full" htmlFor="name">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Name<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
        </label>
      </div>
      <div className="mt-[20px]">
        <label className="w-full mt-[20px]" htmlFor="email">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
        </label>
      </div>
      <div className="w-full flex gap-x-4 mt-[20px]">
        <label className="w-full relative" htmlFor="password">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Create Password<sup className="text-pink-200">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={onChange}
            minLength={5}
            required
            id="password"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>

        <label className="w-full relative" htmlFor="cpassword">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Confirm Password<sup className="text-pink-200">*</sup>
          </p>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="cpassword"
            onChange={onChange}
            minLength={5}
            required
            id="cpassword"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
      </div>
      <button
        className=" w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
        type="submit"
      >
        SIGN UP
      </button>
    </form>
  );
};

export default Signup;
