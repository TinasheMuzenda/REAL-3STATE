import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError({ ...error, [e.target.id]: null });
    console.log(formData);
  };

  const validateForm = () => {
    let hasError = false;
    const newError = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    };

    if (!formData.username) {
      newError.username = "Username is required.";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newError.email = "Email is required.";
      hasError = true;
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!formData.password) {
      newError.password = "Password is required.";
      hasError = true;
    } else if (formData.password.length < 8) {
      newError.password = "Password must be at least 8 characters long.";
      hasError = true;
    } else if (!/[A-Z]/.test(formData.password)) {
      newError.password = "Password must contain at least 1 capital letter.";
      hasError = true;
    } else if (!/[0-9]/.test(formData.password)) {
      newError.password = "Password must contain at least 1 number.";
      hasError = true;
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newError.password = "Password must contain at least 1 special character.";
      hasError = true;
    }

    if (formData.confirmPassword !== formData.password) {
      newError.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    setError(newError);
    return !hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch("/server/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError({ ...error, general: data.message });
        return;
      }

      navigate("/sign-in");
    } catch (error) {
      console.error("Submission error:", error);
      setError({ ...error, general: "An error occurred during submission." });
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid =
    error.username || error.email || error.password || error.confirmPassword;

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded-lg"
          id="username"
          onChange={handleChange}
        />
        {error.username && <p className="text-red-500">{error.username}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />
        {error.email && <p className="text-red-500">{error.email}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded-lg pr-10"
            id="password"
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        {error.password && <p className="text-red-500">{error.password}</p>}

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg pr-10"
            id="confirmPassword"
            onChange={handleChange}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        {error.confirmPassword && (
          <p className="text-red-500">{error.confirmPassword}</p>
        )}

        <button
          type="submit"
          disabled={loading || isFormInvalid}
          className={`bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-900 ${
            loading || isFormInvalid ? "disabled:opacity-80" : ""
          }`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {error.general && <p className="text-red-500">{error.general}</p>}
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
