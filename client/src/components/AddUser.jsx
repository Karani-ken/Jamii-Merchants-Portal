import React from 'react'

function AddUser() {
  return (
    <div className='text-center p-5 input-form'>
    <h3>User details</h3>
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
            <label for="exampleInputPassword1" class="form-label">ID</label>
            <input type="file" class="form-control" id="exampleInputPassword1" />
        </div>   
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"> M-pesa Code</label>
            <input type="text" class="form-control" id="exampleInputPassword1" />
        </div>               
        <button type="submit" class="btn btn-primary">submit</button>
    </form>
</div>
  )
}

export default AddUser