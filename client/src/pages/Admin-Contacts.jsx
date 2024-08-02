import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../storage/auth';
import { toast } from 'react-toastify';

function AdminContacts({ setProgress }) {
    
    useEffect(() => {
        setProgress(30)
        setTimeout(() => {
         setProgress(100)
        }, 500);
       }, [])

  const [contacts, setContacts] = useState([]);
  const { authorizationToken, API } = useAuth();
  const URL = `${API}/api/admin/contacts`;

  const getContactsData = async () => {
    setProgress(20);
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });
      setProgress(50);
      const data = await response.json();
      setContacts(data);
      setProgress(100);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching contacts");
      setProgress(100);
    }
  };

  useEffect(() => {
    getContactsData();
  }, [authorizationToken]);

  const deleteContact = async (id) => {
    setProgress(20);
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Contact deleted successfully");
        getContactsData();
      } else {
        toast.error("Error: couldn't delete the contact");
      }
      setProgress(100);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting contact");
      setProgress(100);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 mt-14">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((curElement, index) => {
            const { username, email, message } = curElement;
            return (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{username}</h2>
                <h3 className="text-lg text-gray-600 mb-2">{email}</h3>
                <p className="text-gray-700">{message}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 my-2 rounded transition duration-300 hover:bg-red-600"
                  onClick={() => deleteContact(curElement._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default AdminContacts;
