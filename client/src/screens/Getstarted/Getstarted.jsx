import React from 'react';
import { useHistory } from "react-router-dom";
import './getstarted.scss';

function Getstarted() {
    const history = useHistory();

    function handleSignup() {
        history.push("/register");
    }
    function handleLogin() {
        history.push("/login");
    }

    return (
        <div>
            <div className="getStartedMain">
                <div className="mainContent">
                    <div className="leftLogo">
                        <img src="images/cloudEdit.webp" alt="sbBg" className="sbBg" />
                        <div className="sbLogo">
                            <img src="images/sbLogo.png" alt="sbLogo" />
                        </div>
                    </div>
                    <div className="rightContent">
                        <div className="rightSignLogin">
                            <div className="signLoginContainer">
                                <h4>Let's stick on Stikboard</h4>
                                <p>join today</p>
                                <button onClick={handleSignup} className="signUpBtn"><span>Sign up</span></button><br></br>
                                <button onClick={handleLogin} className="loginBtn"><span>Login</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Getstarted;
