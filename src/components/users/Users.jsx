"use client";
import React, { useState } from "react";
import "./users.scss";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "@/lib/api/userApi";
import EditModule from "./EditUser";

const Users = () => {
  const { data, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const userRole = localStorage.getItem("role");

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteUser(id);
      alert("User successfully deleted");
      refetch();
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const closeEditModule = () => {
    setSelectedUser(null);
    refetch();
  };

  return (
    <div className="users container mx-auto max-w-[1440px]">
      <div className="users__btns">
        <button className="button__block">
          <IoLockClosedOutline />
          <h2>Block</h2>
        </button>
        <button>
          <IoLockOpenOutline />
        </button>
      </div>
      <h2>Users table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {userRole === "admin" && (
              <>
                <th>Delete</th>
                <th>Edit</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              {userRole === "admin" && (
                <>
                  <td>
                    <button
                      className="bg-red-600 text-white rounded-[5px] p-[5px]"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete User
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-green-600 text-white rounded-[5px] p-[5px]"
                      onClick={() => handleEdit(user)}
                    >
                      Edit User
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser ? (
        <EditModule user={selectedUser} onClose={closeEditModule} />
      ) : (
        <></>
      )}
      {selectedUser ? (
        <div onClick={closeEditModule} className="overlay"></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Users;
