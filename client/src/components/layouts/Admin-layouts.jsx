import React, { useEffect } from 'react';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../storage/auth';

function AdminLayouts({setProgress}) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
     setProgress(100)
    }, 500);
   }, [])

  const { user, isLoading, isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  if (!isLoggedIn || !user.isAdmin) {
    return <Navigate to="/404-Page not found" />;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const isMainAdminRoute = location.pathname === '/admin';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold bg-gray-900">
          Admin Panel
        </div>
        <nav className="mt-10 flex-1">
          <ul>
            <li className="mb-2">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white" : "block py-2.5 px-4 hover:bg-gray-700 rounded text-white"
                }
              >
                Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/admin/contacts"
                className={({ isActive }) =>
                  isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white" : "block py-2.5 px-4 hover:bg-gray-700 rounded text-white"
                }
              >
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 bg-white shadow-inner flex items-center justify-center">
        {isMainAdminRoute && (
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome, {capitalizeFirstLetter(user.username)}</h1>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayouts;
