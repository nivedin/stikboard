import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Navbar from '../static/Navbar';
// import authSvg from '../assets/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../../helpers/auth';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

//
// import { TextField } from '@material-ui/core';

import './register.scss';


const Register = ({ history }) => {


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password1: "",
        password2: "",
    })

    const { email, name, password1, password2 } = formData;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (name && email && password1) {
            if (password1 === password2) {
                axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                    name, email, password: password1
                }).then(res => {
                    setFormData({
                        ...formData,
                        name: "",
                        email: "",
                        password1: "",
                        password2: "",
                    })
                    toast.success(res.data.message)
                })
                    .catch(err => {
                        toast.error(err.response.data.errors)
                    })

            } else {
                toast.error("Password does not match")
            }

        } else {
            toast.error("Please enter all fields")
        }
    }

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        })
    };

    //Facebook Login
    const sendFacebookToken = (userID, accessToken) => {
        axios.post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
            userID, accessToken
        }).then(res => {
            console.log(res.data)
            informParent(res)
        }).catch(err => {
            toast.error('Facebook Auth error')
        })
    }

    //Google Login
    const sendGoogleToken = tokenId => {
        axios.post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
            idToken: tokenId
        })
            .then(res => {
                informParent(res)
            })
            .catch(err => {
                toast.error('google login error')
            })
    };

    //Response from Facebook
    const responseFacebook = response => {
        console.log(response.data);
        sendFacebookToken(response.userID, response.accessToken)
    }

    //Response from Google
    const responseGoogle = response => {
        console.log(response);
        sendGoogleToken(response.tokenId)
    }


    return (
        <div>
            <div className="registerMain">
                {isAuth() ? <Redirect to='/private' /> : null}
                <ToastContainer />
                <div className="mainContainer">
                    <div className="leftIllustration">
                        <div className="mainIllustration">
                            <img src="images/signUpIlli2.png" alt="signUpIllu" />
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="signUpContent">
                            <div className="heading">
                                <img src="images/cloud_og.png" alt="logo" />
                                <h1>Signup</h1>
                            </div>
                            <div className="formContainer">
                                <form onSubmit={handleSubmit}>
                                    <div className="nameContainer">
                                        {/* <TextField className="nameText" color="red" id="outlined-basic" variant="outlined" /> */}
                                        <input type="text" label="Username" onChange={handleChange('name')} value={name} required />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="emailContainer">
                                        {/* <TextField id="standard-basic" label="Email"  /> */}
                                        <input type="email" onChange={handleChange('email')} value={email} required />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="passwordContainer">
                                        {/* <TextField id="standard-basic" label="Password" /> */}
                                        <input type="password" onChange={handleChange('password1')} value={password1} required />
                                        <label htmlFor="password1">Password</label>
                                    </div>
                                    <div className="confirmPassContainer">
                                        {/* <TextField id="standard-basic" label="Confirm Password"  /> */}
                                        <input type="password" onChange={handleChange('password2')} value={password2} required />
                                        <label htmlFor="password2">Confirm Password</label>
                                    </div>
                                    <button type="submit" className="submitBtn"><span>Submit</span> </button><br></br>

                                    <GoogleLogin
                                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className="googleBtn"
                                            >
                                                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" className="svg-inline--fa fa-google fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                            </button>
                                        )}
                                    >
                                    </GoogleLogin>
                                    <FacebookLogin appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                                        autoLoad={false}
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className="facebookBtn"
                                            >
                                                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" className="svg-inline--fa fa-facebook fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                                            </button>
                                        )}
                                    />

                                </form>
                                <p>Already have an account?<a href="/login"> Log In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
