import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="footer bg-gray-200 p-5 shadow">
                <div className="footer_layout flex justify-evenly items-center flex-wrap">
                    <div className="address text-center">
                        <h3 className='address_heading font-bold'>Address</h3>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/contact-us">Nihal, #142, Bangalore</a>
                            </li>
                        </ul>
                    </div>
                     <div className="address text-center">
                        <h3 className='address_heading font-bold'>Quick Links</h3>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/home">Home</a>
                            </li>
                                <li className="nav-item">
                                <a className="nav-link text-dark" href="/about-us">About</a>
                            </li>
                                <li className="nav-item">
                                <a className="nav-link text-dark" href="/contact-us">Contact</a>
                            </li>
                        </ul>
                    </div>
                     <div className="address text-center">
                        <h3 className='address_heading font-bold'>Social</h3>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="https://www.facebook.com" target='_blank'>Facebook</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link text-dark" href="https://www.twitter.com" target='_blank'>Twitter</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link text-dark" href="https://www.linkedin.com" target='_blank'>LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                     <div className="address text-center">
                        <h3 className='address_heading font-bold'>Licence & Agreement</h3>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/privacy-policy">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
