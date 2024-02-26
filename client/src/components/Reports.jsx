import React, { useState,useEffect } from 'react'
import axios from 'axios'
const Reports = () => {
    const [clients, setClients] = useState([])
    const [users, setUsers] = useState([])
    const [selectedAgent, setSelectedAgent] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        async function fetchData() {
          const response = await axios.get('/auth/get-users')
         
          if (response.data.length > 0  ) {
            setUsers(response.data)
            console.log(response.data)
          }
        }
        fetchData();
      },[])
   
        
    const handleGenerateReport = async () => {
        try {
            const filterData = {
                startDate: fromDate,
                endDate: endDate,
                user_id: selectedAgent
            }
            const response = await axios.post('/customer/filter', filterData);
            console.log(response.data)
            if(response.data.length > 0){
                setClients(response.data);
            }else{
                return (<p>No reports from this period</p>)
            }
            
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };
      
    return (
        <div className='m-5 p-3 text-center'>
            <h3>Report</h3>
            <div className='form-group mb-3'>
                <select className='form-control' value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
                    <option>select an agent</option>
                    {users && users?.map((user) => {
                        return (
                            <option value={user.ID} >{user.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="table-responsive">
                <p className='fw-bolder'>Select the period:</p>
                <div className='m-2 d-lg-flex justify-content-around'>
                    <div className='form-group'>
                        <label>From: </label>
                        <input type="date" className='form-control' value={fromDate} onChange={(e)=> setFromDate(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label>To: </label>
                        <input type="date" className='form-control' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <button className='btn btn-primary my-3' onClick={handleGenerateReport}>Generate Report</button>
                </div>
                <table className='table table-striped-columns table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Payment Code</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {clients && clients?.map((client) => {
                            return (
                                <tr key={client.ID}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.payment_code}</td>
                                </tr>
                            )

                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Reports