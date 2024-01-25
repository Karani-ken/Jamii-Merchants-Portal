import React from 'react'
import { Link } from 'react-router-dom'
function AgentDashboard() {
  return (
    <div className='admin-panel'>
         <h1 className='fw-bolder'>Welcome John Doe</h1>
         <div className="card-container">
        <div className="stats-card">
          <h2>9</h2>
          <p>Total Users registered</p>
        </div>
        <div className="stats-card">
          <h2>20</h2>
          <p>Allocated serials</p>
        </div>
        <Link to='add-user' className='btn btn-primary'
        style={{background:'#000', border: 'none'}}>Add client</Link>
      </div>
    </div>
  )
}

export default AgentDashboard