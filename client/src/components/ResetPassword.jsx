import React, { useState } from 'react';
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/auth/reset-password`, {otp, password });
      setMessage('Password reset successful. You can now log in with your new password.');
      toast.success("reset was successfull")
      navigate('/login')
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred. Please try again later.');
      toast.error("error")
    }
  };

  return (
    <div className='text-center d-lg-flex justify-content-center  p-5 input-form'>
      <form onSubmit={handleSubmit} className='shadow-lg p-3'>
        {message && <p>{message}</p>}
        <h2>Reset Password</h2>
        <div className='form-group'>
          <label htmlFor="password" className="form-label">OTP</label>
          <input
            type="number"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <label htmlFor="password" className="form-label">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control"
        />
        <button type="submit" className='btn btn-success'>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
