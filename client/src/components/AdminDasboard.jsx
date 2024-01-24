import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
function AdminDasboard() {
  return (
    <div className='admin-panel'>
      <h1 className='fw-bolder'>Welcome Admin</h1>
      <div className="card-container">
        <div className="stats-card">
          <h2>9</h2>
          <p>Total Users</p>
        </div>
        <div className="stats-card">
          <h2>20</h2>
          <p>Allocated serials</p>
        </div>
      </div>
      <div className='table-responsive p-3 mx-5'>
      <table className='table table-striped-columns table-hover'>
        <thead>
          <tr>
            <th scope='col'>No.</th>
            <th scope='col'> Name</th>
            <th scope='col'> Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Serials</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          <tr>
            <th scope='row'>1</th>
            <td>John Doe</td>
            <td>johndoe@exampe.com</td>
            <td>0712345678</td>
            <td>6</td>
            <td>
                <button className="btn btn-primary" style={{background:'#048243', border: 'none'}}>
                  Assign serial
                  </button>
            </td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>John Doe</td>
            <td>johndoe@exampe.com</td>
            <td>0712345678</td>
            <td>10</td>
            <td>
                <button className="btn btn-primary" style={{background:'#048243', border: 'none'}}>
                  Assign serial
                  </button>
            </td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>John Doe</td>
            <td>johndoe@exampe.com</td>
            <td>0712345678</td>
            <td>15</td>
            <td>
                <button className="btn btn-primary" style={{background:'#048243', border: 'none'}}>
                  Assign serial
                  </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      


    </div>
  )
}

export default AdminDasboard