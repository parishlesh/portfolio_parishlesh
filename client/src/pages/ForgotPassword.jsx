import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../constants';

const ForgotPassword = ({ setProgress }) => {

    useEffect(() => {
        setProgress(30)
        setTimeout(() => {
         setProgress(100)
        }, 500);
       }, [])

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setProgress(0); // Reset progress on component mount
    }, [setProgress]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(30); // Set initial progress

        try {
            const response = await fetch(`${API}/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Email sent successfully");
                setProgress(100); // Complete progress
                navigate("/emailSentRedirect", { state: { email } });
            } else {
                toast.error(data.message || "Something went wrong");
                setProgress(0); // Reset progress on error
            }
        } catch (error) {
            toast.error("Network error: " + error.message);
            setProgress(0); // Reset progress on error
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <p className="text-gray-600 mb-6">Enter your email address below and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
