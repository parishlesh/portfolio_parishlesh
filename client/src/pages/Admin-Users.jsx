import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../storage/auth';
import { toast } from 'react-toastify';

function AdminUsers({ setProgress }) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
     setProgress(100)
    }, 500);
   }, [])

  const [users, setUsers] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllUsersData = async () => {
    setProgress(20);
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });

      setProgress(50);
      const data = await response.json();
      setUsers(data);
      setProgress(100);
    } catch (error) {
      console.log(`Error fetching users: ${error}`);
      setProgress(100);
    }
  };

  const deleteUser = async (id) => {
    setProgress(20);
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        getAllUsersData();
        toast.success("User Deleted Successfully")
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
      setProgress(100);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, [authorizationToken]);

  return (
    <div className="container mx-auto p-4 mt-14">
      <h1 className="text-2xl font-bold mb-4">Admin Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Username</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => {
              const { username, phone, email, _id } = curUser;
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{username}</td>
                  <td className="py-2 px-4 border-b">{email}</td>
                  <td className="py-2 px-4 border-b">{phone}</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={`/admin/users/${_id}/edit`}>
                      <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">Edit</button>
                    </Link>
                    <button onClick={() => deleteUser(_id)} className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminUsers;
