import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function AgentDashboard() {
  const navigate = useNavigate()
  return (
    <div className='admin-panel'>
      <div className='text-center bg-dark mx-5 text-white'>
          <h1>John Doe</h1>
          <div className="d-lg-flex justify-content-end bg-light">
          <div className="shadow-lg text-dark p-3 rounded-lg m-3">
               <button onClick={()=>navigate('/add-user')}
                className='btn btn-primary bg-dark'>Add client</button>
              </div>
              <div className="shadow-lg text-dark p-3 rounded-lg m-3">
                <h4>Total Clients</h4>
                <h6>10</h6>
              </div>
              <div className="shadow-lg text-dark p-3 rounded-lg m-3">
                <h4>Allocated Serials</h4>
                <h6>10</h6>
              </div>
          </div>
      </div>

      <div className="table-responsive P-3 m-5">
        <h3>Registered client details</h3>
        <table className='table table-striped-columns table-hover'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Email</th>
              <th scope='col'>Payment Code</th>
            </tr>
          </thead>
          <tbody  className='table-group-divider'>
          <tr>              
              <td>John Doe</td>
              <td>johndoe@exampe.com</td>
              <td>0712345678</td>
              <td>RQ3HFDFJ</td>                       
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AgentDashboard