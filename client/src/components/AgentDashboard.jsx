import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function AgentDashboard() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {

    async function fetchData() {
      const response = await axios.get('/customer/customers')
      if (response.data.length > 0) {
        setClients(response.data)
        console.log(response.data)
      }
    }
    fetchData()

  }, [])

  return (
    <div className='admin-panel'>
      <div className='text-center  mx-5 '>
        <h1>Agent</h1>
        <div className="d-lg-flex justify-content-end bg-light">
          <div className="shadow-lg text-dark p-3 rounded m-3" style={{ backgroundColor: '#34a832' }}>
            <button onClick={() => navigate('/add-user')}
              className='btn btn-primary bg-dark'>Add client</button>
          </div>
          <div className="shadow-lg text-dark p-3 rounded m-3" style={{ backgroundColor: '#27c1cc' }}>
            <h4>Total Clients</h4>
            <h6>10</h6>
          </div>
          <div className="shadow-lg text-dark p-3 rounded m-3" style={{ backgroundColor: '#de265d' }}>
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
              <th scope='col'>status</th>
              <th scope='col'>serial</th>
              <th scope='col'>Payment Code</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {clients && clients?.map((client) => {
              return (
                <tr key={client.ID}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.status}</td>
                  <td>{client.serial}</td>
                  <td>{client.payment_code}</td>
                </tr>
              )

            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AgentDashboard