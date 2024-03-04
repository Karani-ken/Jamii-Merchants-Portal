import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/forgot-password', { email });
            setMessage('Password reset email sent');
            toast.success(message)
            navigate('/reset-password')
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setMessage('An error occurred.');
            toast.error(message)
        }
    };
    const handleRedirect =() =>{
        navigate('/login')
    }

    return (
        <div className='text-center d-lg-flex justify-content-center  p-5 input-form'>
            <form onSubmit={handleSubmit} className='shadow-lg p-3'>
            {message && <p>{message}</p>}
                <h2>Forgot Password</h2>
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

                <button type="submit" className='btn btn-primary mx-2'>Send Link</button>
                <button onClick={handleRedirect} className='btn btn-secondary'>Cancle</button>
            </form>           
        </div>
    );
};

export default ForgotPassword;
