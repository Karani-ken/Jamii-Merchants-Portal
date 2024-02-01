import React, { useState } from 'react'
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("login succesfull:", formData)
    }
    return (
        <div className='text-center p-5 input-form'>
            <h3>Sign in</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email address</label>
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
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login