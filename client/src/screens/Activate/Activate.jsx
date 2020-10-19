import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticate, isAuth } from '../../helpers/auth';
import { Link, Redirect } from 'react-router-dom';


const Activate = ({ match }) => {
    const [formData, setFormData] = useState({
        name: '',
        token: '',
        show: true
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);

        if (token) {
            setFormData({ ...formData, name, token });
        }

        console.log(token, name);
    }, [match.params]);
    const { name, token, show } = formData;

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .post(`${process.env.REACT_APP_API_URL}/activation`, {
                token
            })
            .then((res) => {
                setFormData({
                    ...formData,
                    show: false
                });

                // toast.success(res.data.message);
                toast.success("Account Successfully created");

            })
            .catch(err => {

                toast.error(err.response.data.errors);
            });
    };


    return (
        <div>
            {isAuth() ? <Redirect to='/' /> : null}
            <ToastContainer />
            <div>
                <h1>Welcome {name}</h1>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Activate your account</button>
                    <a href="/login" target='_self'>Sign In</a>
                </form>
            </div>

        </div>
    )
}

export default Activate;
