"use client";
import { useLoginUserMutation } from "@/lib/api/userApi";
import React, { useState } from "react";
import "./login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  // const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { data, isError, isLoading, isSuccess, error }] =
    useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(data);

  const handleLogin = async (e) => {
    e.preventDefault();

    signIn(formData);
    if (isSuccess) {
      localStorage.setItem("x-auth-token", data.access_token);
      localStorage.setItem("role", data.thisUser.role);
      window.location.href = `${window.location.origin}/`;
    }
  };

  return (
    <div className="container login">
      <h1>Login user</h1>
      <form onSubmit={handleLogin} action="">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
