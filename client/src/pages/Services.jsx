import React, { useEffect } from 'react';
import { useAuth } from '../storage/auth';

function Services({ setProgress }) {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
      setProgress(100)
    }, 500);
  }, [])

  const { service } = useAuth();

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-4xl font-roboto font-semibold text-center my-8">What I Do</h1>
      <p className="text-center text-gray-700 mb-8 font-roboto text-lg">
        I specialize in creating responsive, high-performance web applications using the latest technologies. Here are some of the services I offer:
      </p>
      <div className="grid gap-6 mb-16 md:grid-cols-2 lg:grid-cols-3">
        {service && service.map((currentElement, index) => {
          const { icon, title, description } = currentElement;
          return (
            <div className="bg-white rounded-lg shadow-md p-6 font-roboto text-center hover:scale-105 transition-transform" key={index}>
              <img src={icon} alt={`${title} icon`} className="w-32 h-32 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <hr className='border-t-4 border-red-600 my-3 w-2/12 mx-auto rounded-full' />
              <p className="text-gray-700 font-light font-roboto">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Services;
