import React, { useState, useEffect } from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const Reports = () => {
    const [clients, setClients] = useState([])
    const [users, setUsers] = useState([])
    const [selectedAgent, setSelectedAgent] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [endDate, setEndDate] = useState('');
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/auth/get-users')

            if (response.data.length > 0) {
                setUsers(response.data)
                console.log(response.data)
            }
        }
        fetchData();
    }, [])


    const handleGenerateReport = async () => {
        try {
            const filterData = {
                startDate: fromDate,
                endDate: endDate,
                user_id: selectedAgent
            }
            const response = await axios.post('/customer/filter', filterData);
            console.log(response.data)
            if (response.data.length > 0) {
                setClients(response.data);
            } else {
                return (<p>No reports from this period</p>)
            }

        } catch (error) {
            console.error('Error generating report:', error);
        }
    };
    const downloadPDF = () => {
        const input = document.getElementById('report-table');
        const width = input.offsetWidth;
        const height = input.offsetHeight;

        html2canvas(input, { width, height })
            .then((canvas) => {
                const pdf = new jsPDF('l', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, height, 297);
                pdf.save('report.pdf');
            });
    };
    const handleApprove = async (ID) => {
        const status = "approved"
        try {
            const data = {
                status,
                ID
            }
            const res = await axios.post('/customer/update-status', data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }
    const handleReject = async (ID) => {
        try {
            const status = "rejected"
            const data = {
                status,
                ID
            }
            const res = await axios.post('/customers/customer-status', data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='m-5 p-3 text-center'>
            <h3>Report</h3>
            <div className='form-group mb-3'>
                <select className='form-control' value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
                    <option>select an agent</option>
                    {users && users?.map((user) => {
                        return (
                            <option value={user.ID} key={user.ID} >{user.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="table-responsive">
                <p className='fw-bolder'>Select the period:</p>
                <div className='m-2 d-lg-flex justify-content-around'>
                    <div className='form-group'>
                        <label>From: </label>
                        <input type="date" className='form-control' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label>To: </label>
                        <input type="date" className='form-control' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <button className='btn btn-primary my-3' onClick={handleGenerateReport}>Generate Report</button>
                    <button className='btn btn-success my-3' onClick={downloadPDF}>Download PDF</button>
                </div>
                <div className='table-responsive' id='report-table'>
                    <table className='table table-striped-columns p-3' >
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Phone</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>status</th>
                                <th scope='col'>serial</th>
                                <th scope='col'>Payment Code</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {clients && clients?.map((client) => {
                                return (
                                    <tr key={client.ID}>
                                        <td>{client.name}</td>
                                        <td>{client.phone}</td>
                                        <td>{client.email}</td>
                                        <td>{client.status}</td>
                                        <td>{client.serial}</td>
                                        <td>{client.payment_code}</td>
                                        <td>
                                            <button className='btn btn-success' onClick={()=>handleApprove(client.ID)}>Approve</button>
                                            <button className='btn btn-danger' onClick={()=>handleReject(client.ID)}>Reject</button>
                                        </td>
                                    </tr>
                                )

                            })}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Reports