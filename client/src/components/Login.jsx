import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate();   
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', formData)
            const token = response.data.token;
            //store the token in local storage
            localStorage.setItem('token', token)
            navigate('/')
            window.location.reload()
            console.log("login successfull", response.data);
        } catch (error) {
            console.log('login failed', error)
        }

  
       
       
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
                <Link to='/register' className='btn'>Not yet registered? create account here</Link>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login