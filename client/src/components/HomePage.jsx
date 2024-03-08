import React from 'react'
import Logo from './../assets/faiba.png'
import AFS from './../assets/asflogo.png'
import DataPlan from './../assets/dataplans.json'
const HomePage = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='landing-page'>
            <header>
                <h1>FURAHIA MTANDAO</h1>
                <h3>NA</h3>
                <div>
                    <img src={Logo} alt="" className='logo' />
                </div>
            </header>
            <div className='container'>
                {
                    DataPlan?.map((plan) => {
                        return (
                            <div>
                                <div className="data-plan-card" style={{ backgroundColor: plan.bg }}>
                                    <div className="card-header">
                                        <h1>{plan.data_amount}</h1>
                                    </div>
                                    <div className="card-body">
                                        <p>FOR</p>
                                        <h1>{plan.price}/-</h1>
                                    </div>
                                </div>
                                <p>valid {plan.validity}</p>
                            </div>
                        )
                    })
                }

            </div>
            <footer>
                <div className='footer-contacts'>
                    <div>
                        <h4>CUSTOMER CARE</h4>
                        <p>0747585100</p>
                        <p>0747585000</p>
                    </div>
                    <div>
                        <h3>CONTACT SALES AGENT</h3>
                        <p className='contact-details'>+254 796025098</p>
                    </div>

                    <div>
                        <img src={Logo} alt="logo" style={{ width: '100px' }} />
                    </div>
                </div>
                <div style={{backgroundColor:'white', color:'black'}} >
                    <div className='powered-by'>
                        <p className='fw-bolder mx-2'>Powered by Asgard Fusion Solutions</p>
                        <img src={AFS} alt="logo" className='logo' style={{ height: '100px', width: '100px' }} />
                    </div>

                    <hr  />

                    <p style={{color:'black'}}>All Rights Reserved Copyright &copy; Jamii Merchants - {currentYear} </p>
                </div>

            </footer>


        </div>
    )
}

export default HomePage