import React from 'react'
import Logo from './../assets/faiba.png'
import DataPlan from './../assets/dataplans.json'
const HomePage = () => {
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
                                <div className="data-plan-card" style={{backgroundColor:plan.bg}}>
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
            <div>
                <h4>CUSTOMER CARE</h4>
                <p>0747585100</p>
                <p>0747585000</p>
            </div>
            <div>
                <h3>CONTACT SALES AGENT</h3>
                <p className='contact-details'>073233233</p>
            </div>

            <div>
                <img src={Logo} alt="" style={{width: '100px'}} />
            </div>
        </footer>


        </div>
    )
}

export default HomePage