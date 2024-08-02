import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../storage/auth';
import { toast } from 'react-toastify';

function Login({setProgress}) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
     setProgress(100)
    }, 500);
   }, [])

  const [user, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setProgress(30)
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      const data = await response.json();

      if (response.ok) {
        setProgress(50)
        storeTokenInLS(data.token, user.rememberMe);
        toast.success("Login successful");
        setUser({
          email: "",
          password: "",
          rememberMe: false
        });
        setProgress(100)

        navigate("/");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
        setProgress(100)
        
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const handleGoogleLoginClick = () => {
    window.open(`${API}/auth/google/callback`, '_self');
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <main className="bg-white rounded-lg shadow-lg w-4/5 lg:w-1/2 mx-auto flex overflow-hidden">
        <div className="w-1/2 hidden md:flex items-center justify-center p-5">
          <img src="public/images/Login-amico.png" alt="login photo" className="max-w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-10 2xl:flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">Login</h1>
          <p className="text-sm mb-6 text-gray-600">
            Doesn't have an account yet? <NavLink to="/register" className="text-purple-500 hover:underline">Sign Up</NavLink>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter 6 characters or more"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 w-full"
              />
              <a href="/forgot-password" className="text-xs text-purple-500 hover:underline float-right mt-1">Forgot Password?</a>
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" name="rememberMe" className="h-4 w-4 text-purple-600 border-gray-300 rounded" checked={user.rememberMe} onChange={handleInput} />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Login</button>
          </form>
          {/* <div className="mt-6 text-center text-gray-600">
            <p className="text-sm">or login with</p>
            <div className="mt-2 flex justify-center space-x-4">
              <button onClick={handleGoogleLoginClick} className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <img src="/path/to/google-icon.png" alt="Google" className="w-5 h-5" />
                <span className="ml-2">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <img src="/path/to/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div> */}
        </div>
      </main>
    </section>
  );
}

export default Login;
