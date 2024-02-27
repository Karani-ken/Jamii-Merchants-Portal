import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/forgot-password', { email });
            setMessage('Password reset email sent. Please check your email.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className='shadow-lg p-3'>
                <div className='mb-3'>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <button type="submit" className='btn btn-primary'>Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
