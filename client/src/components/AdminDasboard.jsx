import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AssignSerialModal from './AddSerial'
import {toast} from 'react-toastify'
import axios from 'axios'
function AdminDasboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/auth/get-users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.data.length > 0) {
        setUsers(response.data)
        console.log(response.data)
      }
    }
    fetchData();
  }, [])
  const handleApprove = async (id) => {
    const role = "agent"
    try {
      const data = {
        role,
        id
      }
      const res = await axios.post('/auth/approve', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      toast.success("Agent Approved");
      console.log(res.data)
    } catch (error) {
      console.log(error)
      toast.error("Approval not successfull");
    }

  }
  const handleReject = async (email) => {
    try {

      const res = await axios.delete('/auth/delete-user', email, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      toast.success("Approval rejected");
      console.log(res.data)
    } catch (error) {
      toast.success("Approval reject failed");
      console.log(error)
    }
  }
  /*const handleButtonClick = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }*/
  return (
    <div className='admin-panel'>
      <div className='text-center mx-5'>
        <h1>Admin Dashboard</h1>
        <div className="d-lg-flex justify-content-end bg-light my-5 ">
          <div className="shadow-lg text-dark p-3 rounded m-3" style={{ backgroundColor: '#34a832' }}>
            <button className='btn btn-primary bg-dark'
              onClick={() => navigate('/register')}>Add agent</button>
          </div>
          <div className="shadow-lg text-dark p-3 rounded m-3" style={{ backgroundColor: '#27c1cc' }}>
            <h4>Total Agents</h4>
            <h6>{users.length}</h6>
          </div>
          <div className="shadow-lg text-dark p-3 rounded m-3" style={{ backgroundColor: '#de265d' }}>
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
              {/** <th scope='col'>Serials</th> */}
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {users && users?.map((user) => {
              return (
                <tr key={user.ID}>
                  <th scope='row'>{user.ID}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  {/**<td>6</td> */}
                  <td>
                    {/** <button onClick={handleButtonClick} className="btn btn-primary" style={{ background: '#048243', border: 'none' }}>
                      Assign Serial
                    </button>
                    <AssignSerialModal showModal={showModal} onClose={handleCloseModal} />*/}

                    <button className='btn btn-success' onClick={() => handleApprove(user.ID)}>Approve</button>
                    <button className='btn btn-danger' onClick={() => handleReject(user.email)}>Reject</button>
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