import React from 'react';
import './home.scss';



function Home() {
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
            <main>
                <div className="hero">
                    <div className="leftHero">
                        <h1>The Main Content Goes Here</h1>
                    </div>
                    <div className="rightHero">
                        <img src="images/heroImg.png" alt="heroImg" />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;
