import React from 'react'

const HomePage = () => {
    return (
        <div className='m-5 text-center' style={{ height: '90vh' }}>
            <header className="bg-secondary text-white rounded shadow-lg">
                <h1>Welcome to Jamii Merchants</h1>
                <p>Your Faiba Connection</p>
            </header>
            <section className="shadow-lg overflow-y-scroll" style={{ height: '70%' }}>
                <div className="bg-success rounded p-2 my-2">
                    <h2>Faiba SIM Cards</h2>
                    <p className='text-white'>Experience crystal-clear voice calls and lightning-fast internet speeds with our Faiba SIM cards.</p>
                </div>
                <div className="bg-primary p-2 my-2 rounded">
                    <h2>Data Bundles</h2>
                    <p className='text-white'>Stay connected with our flexible data bundles designed to suit your browsing, streaming, and gaming needs.</p>
                </div>
                <h1>Data Plans</h1>
                <div className='d-lg-flex justify-content-around' >
                    <div className="shadow-lg p-5">
                        <h3>30 <i>Gb/montly</i></h3>
                        <p className='fw-bolder'>For 2000 Kes</p>
                    </div>
                    <div className="shadow-lg p-5">
                        <h3>300 <i>Gb/montly</i></h3>
                        <p className='fw-bolder'>For 1000 Kes</p>
                    </div>
                    <div className="shadow-lg p-5">
                        <h3> 40 <i>Gb/montly</i></h3>
                        <p className='fw-bolder'>For 2500 Kes</p>
                    </div>
                </div>
            </section>
            <footer className="bg-dark text-white mt-5 rounded">
                <p>Contact us for more information:</p>
                <ul style={{ listStyle: 'none' }}>
                    <li>Email: info@jamiimerchants.com</li>
                    <li>Phone: 123-456-7890</li>
                </ul>
            </footer>

        </div>
    )
}

export default HomePage