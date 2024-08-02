import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../storage/auth';
import { toast } from 'react-toastify';

function AdminUserUpdate({ setProgress }) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
     setProgress(100)
    }, 500);
   }, [])

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const { authorizationToken, API } = useAuth();

  const updateUserData = async () => {
    setProgress(20);
    try {
      const response = await fetch(`${API}/api/admin/users/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });
      setProgress(50);
      const data = await response.json();
      setData(data);
      setProgress(100);
    } catch (error) {
      console.log(error);
      setProgress(100);
    }
  };

  useEffect(() => {
    updateUserData();
  }, [authorizationToken, params.id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(20);
    try {
      const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Updated successfully");
        navigate('/admin/users');
      } else {
        toast.error("User not updated");
      }
      setProgress(100);
    } catch (error) {
      console.error(error);
      setProgress(100);
    }
  };

  return (
    <div className="w-4/6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              required
              value={data.username}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              required
              value={data.email}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="number"
              name="phone"
              id="phone"
              autoComplete="off"
              required
              value={data.phone}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUserUpdate;
