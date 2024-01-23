import React from 'react'

const Sidebar = () => {
    return (
        <nav className='' style={{
            background: '#048243',
            width: '20%', borderTopRightRadius: '10px', borderBottomRightRadius: '10px',
            height: '100%'
        }}>
            <h1 className='text-white text-start p-2'>Jamii Merchants</h1>
            <ul>
                <li> <a href="#">Dashboard</a></li>
                <li> <a href="#">Agents</a></li>
                <li> <a href="#">Reports</a></li>
            </ul>

            <button className='btn btn-primary'>Log out</button>
        </nav>
    )
}

export default Sidebar