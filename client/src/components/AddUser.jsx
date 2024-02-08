import React, { useState } from 'react'
import axios from 'axios'
function AddUser() {
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        id_photo: null,
        mpesaCode: ''

    });
    const uploadPreset = "vfvnwbhk"
    const [imagePreview, setImagePreview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleFileInputChnage = (e) => {
        setUserData({ ...userData, id_photo: e.target.files[0] })
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl;
            if (
                userData.id_photo && (
                    userData.id_photo.type === "image/png" ||
                    userData.id_photo.type === "image/jpg" ||
                    userData.id_photo.type === "image/jpeg"
                )
            ) {
                const image = new FormData();
                image.append("file", userData.id_photo)
                image.append("cloud_name", "djsn84htr")
                image.append("upload_preset", uploadPreset)

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/djsn84htr/image/upload",
                    {
                        method: "post",
                        body: image
                    }
                )
                const imgData = await response.json();
                imageUrl = imgData.url.toString();
                setImagePreview(null)
            }

            if (imageUrl !== null) {
                //do save the image in the database now
                const formData = new FormData();
                formData.append('name', userData.name);
                formData.append('phone', userData.phone);
                formData.append('email', userData.email);
                formData.append('id_photo', imageUrl);
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
                    id_photo: null,
                    mpesaCode: ''
                });
                setIsLoading(false)
            }



        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    return (
        <div className='text-center p-5 input-form'>
            <h3>User details</h3>
            <form onSubmit={handleFormSubmit}>
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
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" onChange={handleInputChange} class="form-control" name='email' />
                    <small class="text-muted">We'll never share your email with anyone else </small>

                </div>
                <div class="mb-3">
                    <label for="id" class="form-label">ID</label>
                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                        onChange={handleFileInputChnage} class="form-control" name='id_photo' />
                    <div>
                        {
                            imagePreview &&
                            <img src={imagePreview && imagePreview} 
                            alt="id" />
                        }
                    </div>
                </div>
                <div class="mb-3">
                    <label for="mpesacode" class="form-label"> M-pesa Code</label>
                    <input type="text" onChange={handleInputChange} class="form-control" name='mpesaCode' />
                </div>
                <button type="submit" onChange={handleInputChange} class="btn btn-primary">submit</button>
            </form>
        </div>
    )
}

export default AddUser