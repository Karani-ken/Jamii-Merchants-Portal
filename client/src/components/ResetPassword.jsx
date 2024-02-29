import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/auth/reset-password/${token}`, { password });
      setMessage('Password reset successful. You can now log in with your new password.');
      toast.success("reset was successfull")
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
        <label htmlFor="password" className="form-label">Email</label>
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
