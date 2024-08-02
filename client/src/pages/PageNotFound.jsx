import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function PageNotFound({setProgress}) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
     setProgress(100)
    }, 500);
   }, [])

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>
        <h4 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h4>
        <p className="text-gray-700 mb-6">
          The page you are trying to reach does not exist. If you believe there is an issue, feel free to contact us.
        </p>
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={handleGoBack}
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Go Back
          </button>
          <NavLink
            to="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Return Home
          </NavLink>
          <NavLink
            to="/contact"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
