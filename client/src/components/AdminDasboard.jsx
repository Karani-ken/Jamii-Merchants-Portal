import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AssignSerialModal from './AddSerial'
function AdminDasboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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
          <div className="shadow-lg text-dark p-3 rounded-lg m-3" style={{backgroundColor:'blue'}}>
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
            <tr>
              <th scope='row'>1</th>
              <td>John Doe</td>
              <td>johndoe@exampe.com</td>
              <td>0712345678</td>
              <td>6</td>
              <td>
                <button onClick={handleButtonClick} className="btn btn-primary" style={{ background: '#048243', border: 'none' }}>
                  Assign Serial
                </button>
                <AssignSerialModal showModal={showModal} onClose={handleCloseModal} />
              </td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td>John Doe</td>
              <td>johndoe@exampe.com</td>
              <td>0712345678</td>
              <td>10</td>
              <td>
                <button onClick={handleButtonClick} className="btn btn-primary" style={{ background: '#048243', border: 'none' }}>
                  Assign Serial
                </button>
                <AssignSerialModal showModal={showModal} onClose={handleCloseModal} />
              </td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td>John Doe</td>
              <td>johndoe@exampe.com</td>
              <td>0712345678</td>  
              <td>15</td>
              <td>
                <button onClick={handleButtonClick} className="btn btn-primary" style={{ background: '#048243', border: 'none' }}>
                  Assign Serial
                </button>
                <AssignSerialModal showModal={showModal} onClose={handleCloseModal} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>



    </div>
  )
}

export default AdminDasboard