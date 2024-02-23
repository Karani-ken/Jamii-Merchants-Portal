import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const AddSerial = ({ showModal, onClose }) => {
  const [serialNumber, setSerialNumber] = useState('');

  const handleInputChange = (e) => {
    setSerialNumber(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Serial number submitted:', serialNumber);

    onClose();
  }
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Serial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="serialNumber">Serial Number:</label>
            <input
              type="text"
              className="form-control"
              id="serialNumber"
              value={serialNumber}
              onChange={handleInputChange}
            />
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddSerial