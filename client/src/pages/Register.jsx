import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../storage/auth";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register({ setProgress }) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
      setProgress(100)
    }, 500);
  }, [])

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(30)
    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setProgress(50)
      const data = await response.json();
      if (response.ok) {
        storeTokenInLS(data.token);
        toast.success("Registration Successful");
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        setProgress(100)
        navigate("/");
      } else {
        setProgress(100)
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred during the registration. Please try again."
      );
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen mt-10">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row m-14 w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-6">Sign up</h1>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                required
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                required
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                required
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                required
                value={user.phone}
                onChange={handleInput}
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" required />
              <label className="text-sm">
                I agree all statements in{" "}
                <Link to={'/terms-condition'} className="text-blue-500">
                  Terms of service
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            <a href="/login" className="text-blue-500">
              I am already a member
            </a>
          </p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="/images/Sign up-amico.png"
            alt="registration photo"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default Register;
