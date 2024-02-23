import React, { useState } from 'react'
import axios from 'axios'
function AddUser() {
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        mpesaCode: ''

    });
    const [imagePreviewFront, setImagePreviewFront] = useState(null);
    const [imagePreviewBack, setImagePreviewBack] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleFileInputChange = (e, side) => {
        const file = e.target.files[0];
        setUserData({ ...userData, [side]: file });

        const imagePreviewFunc = side === 'id_photo_front' ? setImagePreviewFront : setImagePreviewBack;
        imagePreviewFunc(URL.createObjectURL(file));
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            //do save the image in the database now
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('email', userData.email);
            formData.append('mpesaCode', userData.mpesaCode);
            const res = await axios.post('/customer/addcustomer', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('User added successfully:', res.data);
            // Reset form fields
            setUserData({
                name: '',
                phone: '',
                email: '',
                mpesaCode: ''
            });
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    return (
        <div className='d-lg-flex justify-content-center text-center p-5 input-form'>
            <form onSubmit={handleFormSubmit} className='shadow-lg p-3 m-3 w-100'>
                <h3>Personal details</h3>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" onChange={handleInputChange}
                        name='name' />

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Phone</label>
                    <input type="number" class="form-control"
                        onChange={handleInputChange} name='phone' />

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" onChange={handleInputChange} class="form-control" name='email' />
                </div>
                <div class="mb-3">
                    <label for="mpesacode" class="form-label"> M-pesa Code</label>
                    <input type="text" onChange={handleInputChange} class="form-control" name='mpesaCode' />
                </div>
                <button type="submit"  class="btn btn-primary">submit</button>
            </form>
            <form className='shadow-lg p-3 m-3'>
                <h3>Verification Documents</h3>
                <p>upload ID card photos</p>
                <div className="mb-3">
                    <label htmlFor="id-front" className="form-label">Front side</label>
                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => handleFileInputChange(e, 'id_photo_front')} className="form-control" id="id-front" />
                    {imagePreviewFront && <img src={imagePreviewFront} alt="id front" style={{ height: '150px', width: '300px' }} />}
                </div>
                <div className="mb-3">
                    <label htmlFor="id-back" className="form-label">Back side</label>
                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => handleFileInputChange(e, 'id_photo_back')} className="form-control" id="id-back" />
                    {imagePreviewBack && <img src={imagePreviewBack} alt="id back" style={{ height: '150px', width: '300px' }} />}
                </div>  
                <button type='submit' className='btn btn-primary'>submit</button>            

            </form>

        </div>
    )
}

export default AddUser