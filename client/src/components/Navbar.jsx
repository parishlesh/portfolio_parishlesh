import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../storage/auth';
import { FaHome, FaUser, FaPhone, FaServicestack, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const { isLoggedIn, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  const getLinkClass = ({ isActive }) =>
    `text-black text-l font-roboto ${isActive ? 'border-b-2 border-black' : ''}`;

  const getIconClass = ({ isActive }) =>
    `text-black text-l ${isActive ? 'border-b-2 border-black' : ''}`;

  return (
    <>
      {/* Desktop Navbar */}
      <header className="bg-[#FCFCFC] fixed top-0 left-1/2 -translate-x-1/2 py-4 hidden md:flex w-full md:justify-between z-10">
        <div className="container mx-auto flex justify-between items-center w-full max-w-screen-xl">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <div className="text-black font-islandMoment text-4xl mx-4">
              Parishlesh
            </div>
          </NavLink>
          
          {/* Nav Menu */}
          <nav>
            <ul className="flex space-x-8 m-2">
              <li><NavLink to="/" className={getLinkClass}>Home</NavLink></li>
              <li><NavLink to="/about" className={getLinkClass}>About</NavLink></li>
              <li><NavLink to="/contact" className={getLinkClass}>Contact</NavLink></li>
              <li><NavLink to="/services" className={getLinkClass}>Services</NavLink></li>
              {isLoggedIn ? (
                <li><NavLink to="/logout" className={getLinkClass} onClick={handleLogout}>Logout</NavLink></li>
              ) : (
                <li><NavLink to="/login" className={getLinkClass}>Login</NavLink></li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Navbar */}
      <header className="md:hidden fixed inset-x-0 top-0 z-10 bg-[#FCFCFC]">
        <div className="py-4 border-b border-gray-200 text-center">
          <NavLink to="/" className="text-black font-islandMoment text-3xl">
            Parishlesh
          </NavLink>
        </div>
      </header>
      
      <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 bg-[#FCFCFC]">
        <ul className="flex justify-around py-4 shadow-top border-gray-200">
          <li><NavLink to="/" className={getIconClass}><FaHome/></NavLink></li>
          <li><NavLink to="/about" className={getIconClass}><FaUser/></NavLink></li>
          <li><NavLink to="/contact" className={getIconClass}><FaPhone/></NavLink></li>
          <li><NavLink to="/services" className={getIconClass}><FaServicestack/></NavLink></li>
          {isLoggedIn ? (
            <li><NavLink to="/logout" className={getIconClass} onClick={handleLogout}><FaSignOutAlt/></NavLink></li>
          ) : (
            <li><NavLink to="/login" className={getIconClass}><FaSignInAlt /></NavLink></li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
