import React from 'react'

const AddSerial = () => {
  return (
    <div className='text-center p-5 input-form'>
            <h3>Assign Serial</h3>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Enter Serial</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>               
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default AddSerial