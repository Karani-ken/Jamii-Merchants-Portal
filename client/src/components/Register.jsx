import React from 'react'

export const Register = () => {
    return (
        <div className='text-center p-5 input-form'>
            <h3>Create Account</h3>
            <form>
            <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                   
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Phone</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                   
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                   
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>   
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"> Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>               
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
