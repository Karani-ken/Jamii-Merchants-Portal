import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AssignSerialModal from './AddSerial'
import axios from 'axios'
function AdminDasboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/auth/get-users')
      if (response > 0) {
        setUsers(response.data)
        console.log(response.data)
      }
    }
    fetchData();
  })
  const handleButtonClick = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  return (
    <div className='admin-panel'>
      <div className='text-center bg-dark mx-5 text-white'>
        <h1>Admin</h1>
        <div className="d-lg-flex justify-content-end bg-light">
          <div className="shadow-lg text-dark p-3 rounded-lg m-3" style={{ backgroundColor: 'blue' }}>
            <button className='btn btn-primary bg-dark'
              onClick={() => navigate('/register')}>Add agent</button>
          </div>
          <div className="shadow-lg text-dark p-3 rounded-lg m-3">
            <h4>Total Agents</h4>
            <h6>10</h6>
          </div>
          <div className="shadow-lg text-dark p-3 rounded-lg m-3">
            <h4>Allocated Serials</h4>
            <h6>10</h6>
          </div>
        </div>
      </div>

      <div className='table-responsive p-3 mx-5'>
        <h4>agents information</h4>
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
            {users && users.map((user) => {
              return (
                <tr key={user.ID}>
                  <th scope='row'>{user.name}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>6</td>
                  <td>
                    <button onClick={handleButtonClick} className="btn btn-primary" style={{ background: '#048243', border: 'none' }}>
                      Assign Serial
                    </button>
                    <AssignSerialModal showModal={showModal} onClose={handleCloseModal} />
                  </td>
                </tr>
              )
            })}


          </tbody>
        </table>
      </div>



    </div>
  )
}

export default AdminDasboard