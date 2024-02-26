import React, { useState, useEffect } from 'react'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import axios from 'axios'
function AddUser() {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        payment_code: '',       
        id_photo_front: null,
        id_photo_back: null

    });
    const [imagePreviewFront, setImagePreviewFront] = useState(null);
    const [imagePreviewBack, setImagePreviewBack] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const token = localStorage.getItem('token')
    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        if (token) {
            try {
                const decodeToken = jwtDecode(token)              
                setUserId(decodeToken.userId)
            } catch (error) {
                console.log('Error decoding token', error);
                           }
        } else {
            
        }
    }, [token]);
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
            formData.append('payment_code', userData.payment_code);
            formData.append('user_id', userId)
            formData.append('id_photo_front', userData.id_photo_front);
            formData.append('id_photo_back', userData.id_photo_back)
            const res = await axios.post('/customer/addcustomer', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success("Client added successfully");
            // Reset form fields
            setUserData({
                name: '',
                phone: '',
                email: '',
                payment_code: '',
                user_id: '',
                id_photo_front: null,
                id_photo_back: null
            });
            setImagePreviewFront(null);
            setImagePreviewBack(null);
            setIsLoading(false)
           
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!!");
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleFormSubmit} className='mx-lg-5 mx-2 px-lg-5'>
            <div className='d-lg-flex justify-content-center text-center p-lg-5 p-3 input-form' >
                <div className='shadow-lg p-3 m-lg-3 w-100'>
                    <h3>Personal details</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={handleInputChange}
                            name='name' />

                    </div>
                    <div className="mb-3">      
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                        <input type="number" className="form-control"
                            onChange={handleInputChange} name='phone' />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" onChange={handleInputChange} className="form-control" name='email' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mpesacode" className="form-label"> M-pesa Code</label>
                        <input type="text" onChange={handleInputChange} className="form-control" name='payment_code' />
                    </div>
                </div>
                <div className='shadow-lg p-3 m-lg-3 m-2'>
                    <p className='fw-bolder'>Verification Documents</p>
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

                </div>
            </div>
            <button type='submit' className='btn btn-primary mx-5'>submit</button>

        </form>
    )
}

export default AddUser