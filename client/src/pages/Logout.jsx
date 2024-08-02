import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../storage/auth';

const Logout = ({setProgress}) => {

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
     setProgress(100)
    }, 500);
   }, [])

  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/login" />;
};

export default Logout;
