import React,{useState} from 'react'
import { Link } from 'react-router-dom';
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted:", formData)
    }
    return (
        <div className='text-center p-5 input-form'>
            <h3>Create Account</h3>
            <form onSubmit={handleSubmit}>
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
