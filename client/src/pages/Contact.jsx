import React, { useState, useEffect } from 'react';
import { useAuth } from '../storage/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

function Contact({ setProgress }) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
     setProgress(100)
    }, 500);
   }, [])

  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: ""
  });

  const [userData, setUserData] = useState(true);
  const { user, API } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: ""
      });
      setUserData(false);
    }
  }, [user, userData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(20);

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact),
      });

      setProgress(70);
      if (response.ok) {
        toast.success("Message sent successfully");
        setContact({
          username: "",
          email: "",
          message: ""
        });
        navigate("/contact");
      } else {
        toast.error("Something went wrong");
      }
      setProgress(100);
    } catch (error) {
      toast.error(error.message);
      setProgress(100);
    }
  };

  return (
    <section className="relative">
      <div className="w-full h-full mt-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220.83636955103194!2d75.61153329940431!3d28.910329327348755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3913b1a2de5bbd1d%3A0x8eefd4ecab2ae20a!2sAdarsh%20bachpan%20school!5e0!3m2!1sen!2sin!4v1720524877837!5m2!1sen!2sin"
          width="100%"
          height="378px"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="absolute left-0 z-10 w-full h-full flex items-center justify-center mt-2">
        <div className="bg-white flex flex-col lg:flex-row items-center h-auto w-[80%] lg:w-[60%] mx-auto p-4 shadow-lg justify-between rounded-lg mb-80 sm:mb-48 md:mb-36">
          <div className="w-full lg:w-1/2 p-2">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="username" className="block text-lg font-light font-roboto text-gray-700"></label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  required
                  value={contact.username}
                  onChange={handleInput}
                  placeholder='Username'
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-roboto font-light text-gray-700"></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  value={contact.email}
                  onChange={handleInput}
                  placeholder='Email'
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-roboto block text-lg font-light text-gray-700"></label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="4"
                  autoComplete="off"
                  required
                  value={contact.message}
                  onChange={handleInput}
                  placeholder='Message'
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-roboto text-lg font-light rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="w-full lg:w-1/2 lg:px-20 lg:space-y-8 space-y-4 p-7 px-2">
            <div className="flex items-center space-x-3">
              <FaPhone className="text-2xl text-gray-600" />
              <div>
                <p className="text-lg font-roboto font-light text-gray-700">Make a call</p>
                <p className="text-sm font-roboto font-light text-gray-400 text-wrap">+91 86839 66014</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-2xl text-gray-600" />
              <div>
                <p className="text-lg font-roboto font-light text-gray-700">Visit me</p>
                <p className="text-sm font-roboto font-light text-gray-400 text-wrap">Siwani Mandi, Bhiwani, Haryana</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-xl text-gray-600" />
              <div>
                <p className="text-lg font-roboto font-light text-gray-700">Email</p>
                <p className="text-sm font-roboto font-light text-gray-400 text-wrap">parishleshfulvanshi@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
