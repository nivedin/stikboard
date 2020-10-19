import React from 'react';
import './navbar.scss';
import { authenticate, isAuth } from '../../helpers/auth';


function Navbar() {
    return (
        <div>
            <header>
                <nav>
                    <div className="navContainer">
                        <div className="mainLogo" >
                            <a href="/">
                                <img src="images/logo.png" alt="logo" /></a>
                        </div>
                        <div className="rightBtn">
                            <a type="button" href="/getstarted" className="getStarted">Get Started</a>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
