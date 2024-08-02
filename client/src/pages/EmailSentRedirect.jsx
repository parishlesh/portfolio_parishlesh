import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EmailSentRedirect = ({ setProgress }) => {

    useEffect(() => {
        setProgress(30)
        setTimeout(() => {
         setProgress(100)
        }, 500);
       }, [])

    const location = useLocation();
    const { email } = location.state || {}; // Retrieve the email from the state

    useEffect(() => {
        setProgress(30); // Set initial progress
        setTimeout(() => setProgress(60), 500); // Simulate progress
        setTimeout(() => setProgress(100), 1000); // Complete progress
    }, [setProgress]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h3 className="text-2xl font-bold mb-4">Email Sent</h3>
                <p className="text-gray-600">
                    An email has been successfully sent to <b>{email}</b>. Please check your inbox and follow the instructions to reset your password.
                </p>
            </div>
        </div>
    );
};

export default EmailSentRedirect;
