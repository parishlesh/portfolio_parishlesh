import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { SlPaperPlane } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";

import { Link, NavLink } from 'react-router-dom';

function Home({ setProgress }) {
  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
      setProgress(100)
    }, 500);
  }, [])

  return (<>\
    {/* Main Content */}
    <div className="grid grid-cols-1 rounded-xl bg-[#ffffff] w-[85%] mx-auto my-auto mt-16 sm:mt-16 lg:grid-cols-2 lg:mt-16 lg:w-[70%] ">
      {/* Intro Section */}
      <div className='sm:order-2 lg:place-content-end'>

          <div className='border-l-2 w-52 p-2 ml-2'>
            <img src="images/3-01.png" alt="" />
          </div>
        <div className="grid grid-rows-2 h-fit lg:order-1">
          <div className='text-center mb-10 lg:text-left  '>
            <h1 className="font-roboto font-semibold text-[45px] p-2 m-1 pb-0">I'm Parishlesh</h1>
            <h2 className="font-roboto font-light text-[28px] p-2 pt-0 m-1">Frontend Developer</h2>
            <p className="font-roboto font-light text-[16px] text-wrap m-1 p-2 pt-0">
              I’m a web developer passionate about turning concepts into reality with React JS. My expertise in HTML and CSS, combined with a creative touch, allows me to build exceptional web solutions. Dive into my portfolio and see what I can do!
            </p>
          </div>
          <div className='flex  flex-col items-center h-fit lg:items-start m-1 p-2'>
            <NavLink to={"/contact"}>
              <button className="font-roboto font-light text-white bg-[#E61D1D] w-40 h-12 rounded-lg hover:bg-[#cb3737] m-3 flex justify-center items-center">
                <p className='p-1'>Contact me</p> <SlPaperPlane />
              </button>
            </NavLink>
            <div className="p-2 m-1 lg:m-0 lg:p-0">
              <div className='flex gap-7 p-2 m-1'>
                <a href="https://github.com/parishlesh#" className="text-3xl text-gray-700 hover:text-gray-400">
                  <FaGithub />
                </a>
                <a href="https://x.com/_parishlesh" className="text-3xl text-gray-700 hover:text-gray-400">
                  <FaXTwitter />
                </a>
                <a href="https://www.facebook.com/ParishleshFulvanshi" className="text-3xl text-gray-700 hover:text-gray-400">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/_parishlesh/" className="text-3xl text-gray-700 hover:text-gray-400">
                  <FaInstagramSquare />
                </a>
                <a href="https://www.linkedin.com/in/parishlesh-fulvanshi-a74048232/" className="text-3xl text-gray-700 hover:text-gray-400">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden sm:hidden lg:flex items-center justify-center order-1 lg:order-2">
        <img src="/images/homepage.png" alt="Parishlesh" className="" />
      </div>
    </div>

  </>
  );
}

export default Home;
