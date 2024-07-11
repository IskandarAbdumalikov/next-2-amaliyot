"use client";
import { useEditUserMutation } from "@/lib/api/userApi";
import React, { useState, useEffect } from "react";
import "../../app/login/login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EditModule = ({ user, onClose }) => {
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [editUser, { data, isError, isLoading, isSuccess, error }] =
    useEditUserMutation();

  useEffect(() => {
    setFormData(initialState);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser({ id: user.id, ...formData });
    alert("User edited successfully");
    onClose();
  };

  return (
    <div  className="container login edit__module">
      <h1>Edit user</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditModule;
