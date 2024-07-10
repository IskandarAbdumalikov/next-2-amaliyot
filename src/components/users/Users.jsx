"use client";
import React, { useState, useEffect } from "react";
import "./users.scss";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from "@/hooks/fetchUser";

const Users = ({ data }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(data.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (e, userId) => {
    if (e.target.checked) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  useEffect(() => {
    if (selectedUsers.length === data.length) {
      document.getElementById("selectAll").checked = true;
    } else {
      document.getElementById("selectAll").checked = false;
    }
  }, [selectedUsers, data]);

  
  const handleDelete = async () => {
    if (confirm("Are you sure")) {
      try {
        const result = await deleteData(selectedUsers);
        console.log(result);
        setSelectedUsers([]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="users">
      <div className="users__btns">
        <button className="button__block">
          <IoLockClosedOutline />
          <h2>Block</h2>
        </button>
        <button>
          <IoLockOpenOutline />
        </button>
        <button onClick={handleDelete}>
          <FaRegTrashAlt />
        </button>
      </div>
      <h2>Users table</h2>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="selectAll"
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={(e) => handleSelectUser(e, user._id)}
                />
              </td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.lstLogTime}</td>
              <td>{user.regTime}</td>
              <td>{user.status ? "Active" : "Blocked"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
