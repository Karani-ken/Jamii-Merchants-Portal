import React, {useState,useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'
import { Link, useNavigate} from 'react-router-dom'
const Sidebar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [role, setRole] = useState('');
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {   
    if (token) {
      try {
        const decodeToken = jwtDecode(token)       
        setIsAuthenticated(true)
        setRole(decodeToken.role); 
      } catch (error) {
        console.log('Error decoding token', error);
        setIsAuthenticated(false);
      }
    }else {
        setIsAuthenticated(false)
    }
  },[isAuthenticated, token]);

  const hanldeLogOut = () =>{
    localStorage.removeItem('token');
    navigate('/login')
    window.location.reload()
  }
    return (
        <div>
            <input type="checkbox" id='check' />
            <label htmlFor="check">
                <svg xmlns="http://www.w3.org/2000/svg" id='btn' viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" id='cancel' viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            </label>
            <div className="sidebar">
                <span className="logo">
                    <h1>Jamii Merchants</h1>
                </span>
                <div className="links">
                    <ul>
                        <li><Link to='/' >Home</Link></li>
                        <li>
                            {isAuthenticated && role === "admin" ? (
                                <Link to='/admin'>Dashboard</Link>
                            ):(
                                <Link to='/agent'>Dashboard</Link>
                            )}
                        </li>
                        <li> <Link to='/reports'>Reports</Link> </li>
                        {
                            isAuthenticated ? (
                                <button className='btn custom-btn' onClick={hanldeLogOut}>Log out</button>
                            ):(
                                <Link to='/login' className='btn custom-btn'>Log in</Link>
                            )
                        }
                       
                    </ul>

                </div>
            </div>
   
        </div>
    )
}

export default Sidebar