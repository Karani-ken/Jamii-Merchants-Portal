import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function AddUser() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        payment_code: '',
        serial:'',        
        id_photo_front: null,
        id_photo_back: null,
        passport: null,
        payment_pic: null

    });
    const [imagePreviewFront, setImagePreviewFront] = useState(null);
    const [imagePreviewBack, setImagePreviewBack] = useState(null);
    const [imagePreviewPassport, setImagePreviewPassport] = useState(null)
    const [imagePreviewPaymentPic, setImagePreviewPaymentPic] = useState(null);
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

        switch (side) {
            case 'id_photo_front':
                setImagePreviewFront(URL.createObjectURL(file));
                break;
            case 'id_photo_back':
                setImagePreviewBack(URL.createObjectURL(file));
                break;
            case 'passport':
                setImagePreviewPassport(URL.createObjectURL(file));
                break;
            case 'payment_pic':
                setImagePreviewPaymentPic(URL.createObjectURL(file));
                break;
            default:
                break;
        }
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
            formData.append('serial', userData.serial)
            formData.append('user_id', userId)
            formData.append('id_photo_front', userData.id_photo_front);
            formData.append('id_photo_back', userData.id_photo_back);
            formData.append('passport', userData.passport);
            formData.append('payment_pic', userData.payment_pic);
            const res = await axios.post('/customer/addcustomer', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res.data)
            toast.success("Client added successfully");
            // Reset form fields
            setUserData({
                name: '',
                phone: '',
                email: '',
                payment_code: '', 
                serial:'',              
                user_id: '',
                id_photo_front: null,
                id_photo_back: null,
                passport: null,
                payment_pic: null,
            });
            setImagePreviewFront(null);
            setImagePreviewBack(null);
            setImagePreviewPassport(null);
            setImagePreviewPaymentPic(null);
            navigate('/agent')

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
                    <div className="mb-3">
                        <label htmlFor="serial" className="form-label">Serial</label>
                        <input type="text" onChange={handleInputChange} className="form-control" name='serial' />
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
                    <p>Upload Passport</p>
                    <div className="mb-3">
                        <label htmlFor="passport" className="form-label">
                            Passport
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => handleFileInputChange(e, 'passport')}
                            className="form-control"
                            id="passport"
                        />
                        {imagePreviewPassport && <img src={imagePreviewPassport} alt="Passport" style={{ height: '150px', width: '300px' }} />}
                    </div>
                    <p>Upload Payment Picture</p>
                    <div className="mb-3">
                        <label htmlFor="payment-pic" className="form-label">
                            Payment Picture
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => handleFileInputChange(e, 'payment_pic')}
                            className="form-control"
                            id="payment-pic"
                        />
                        {imagePreviewPaymentPic && (
                            <img src={imagePreviewPaymentPic} alt="Payment Picture" style={{ height: '150px', width: '300px' }} />
                        )}
                    </div>

                </div>
            </div>
            <button type='submit' className='btn btn-primary mx-5'>submit</button>

        </form>
    )
}

export default AddUser