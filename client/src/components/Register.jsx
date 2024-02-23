import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
export const Register = () => {
    const [formData, setFormData] = useState(
        {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmpwd: ''
        }
    )
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/register', formData)
            console.log("register successfull", response.data);
        } catch (error) {
            console.log('register failed', error)
        }
    }
    return (
        <div className='text-center p-5 input-form  d-lg-flex justify-content-center'>

            <form onSubmit={handleSubmit} className='shadow-lg p-3'>
                <h3>Create Account</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        name='name'
                        className="form-control"
                        required
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="phone"
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        aria-describedby="emailHelp"
                        required
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password2" className="form-label"> Confirm Password</label>
                    <input
                        type="password"
                        name='confirmpwd'
                        value={formData.confirmpwd}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <Link to='/login' className='btn'>Already have an account? Login here</Link>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}
