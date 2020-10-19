import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../../helpers/auth';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import "./login.scss";

const Login = ({ history }) => {
    const [formData, setFormData] = useState({
        email: "",
        password1: "",
    })

    const { email, password1 } = formData;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value })
    }


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


    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
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

    const handleSubmit = e => {
        e.preventDefault()
        if (email && password1) {
            axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                email, password: password1
            }).then(res => {
                authenticate(res, () => {
                    setFormData({
                        ...formData,
                        email: "",
                        password1: ""
                    })
                });
                if (isAuth() && isAuth().role === 'admin') {
                    history.push('/admin')
                } else {
                    history.push('/private');
                }
                toast.success(`SignIn Successfull,Welcome ${res.data.user.name}`);

            }).catch(err => {
                toast.error(err.response.data.errors)
            })
        } else {
            toast.error("Please enter all fields")
        }
    }


    return (
        <div>
            <div className="loginMain">
                {isAuth() ? <Redirect to='/private' /> : null}
                <ToastContainer />
                <div className="mainContainer">
                    <div className="leftContainer">
                        <div className="leftMainImg">
                            <img src="images/loginIllu.png" alt="leftImg" />
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="heading">
                            <img src="images/cloud_og.png" alt="logo" />
                            <h1>Sign In</h1>
                        </div>
                        <div className="formContainer">
                            <form onSubmit={handleSubmit}>
                                <div className="emailContainer">
                                    <input type="email" onChange={handleChange('email')} value={email} autoComplete />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="passwordContainer">
                                    <input type="password" onChange={handleChange('password1')} value={password1} />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <button type="submit" className="loginBtn">Login</button><br />
                                <a href="/users/password/forget" className="forgetLink">Forget Password ?</a>
                                <div className="socialLogin">
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
                                    />
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
                                </div>
                                <p className="signLink">New here ? <a href="/register">Sign Up</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;



// "{\"_id\":\"5f80331c4f1dee3d508265f2\",\"name\":\"Zayn JJ\",\"email\":\"zaynjj610@gmail.com\",\"role\":\"admin\"}"