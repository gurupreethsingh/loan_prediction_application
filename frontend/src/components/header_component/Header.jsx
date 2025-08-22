import React from 'react'

const Header = () => {
    return (
        <div className='main_header flex justify-around items-center shadow flex-wrap p-2 bg-gray-200'>

            <div className="header_logo">
                <div className="log">
                    <a href='/home' className='font-bold text-gray-900'>LOGO</a>
                </div>
            </div>
            <div className="header_links">
                <div className="header_menu">
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link text-gray-900 font-bold" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-gray-900 font-bold" href="about-us">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-bold text-gray-900" href="/contact-us">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="header_user_links">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-item text-gray-900 font-bold" href="/login">Login</a>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Header
