"use client";
import { useRegisterUserMutation } from "@/lib/api/userApi";
import React, { useState } from "react";
import "../login/login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [register, { data, isError, isLoading, isSuccess, error }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    register(formData);
  };
  return (
    <div className="container login">
      <h1>Register user</h1>
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
          <button type="button">
            {showPassword ? (
              <FaEyeSlash onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye onClick={() => setShowPassword(true)} />
            )}
          </button>
        </div>
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default Register;
