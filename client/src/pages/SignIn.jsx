import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: null,
    password: null,
    general: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError({ ...error, [e.target.id]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError({ ...error, email: "Email is required." });
      return;
    }

    if (!formData.password) {
      setError({ ...error, password: "Password is required." });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError({ ...error, general: data.message });
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
      setError({ ...error, general: "An error occurred during submission." });
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = error.email || error.password;

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <button
          type="submit"
          disabled={loading || isFormInvalid}
          className={`bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-900 ${
            loading || isFormInvalid ? "disabled:opacity-80" : ""
          }`}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {error.general && <p className="text-red-500">{error.general}</p>}
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
