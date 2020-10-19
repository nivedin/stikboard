import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Reset({ match }) {
    const [formData, setFormData] = useState({
        password1: "",
        password2: "",
        token: ""
    });

    const { password1, password2, token } = formData;

    useEffect(() => {
        let token = match.params.token
        if (token) {
            setFormData({ ...formData, token })
        }
    }, [])

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ((password1 === password2) && password1 && password1) {
            axios.put(`${process.env.REACT_APP_API_URL}/password/reset`, {
                newPassword: password1,
                resetPasswordLink: token
            }).then(res => {
                setFormData({ ...formData, password1: "", password2: "" });
                toast.success(res.data.message)
            }).catch(err => {
                toast.error(`${err.response.data.error}`)
            })
        }
        else {
            toast.error("Password does not match")

        }
    }
    return (
        <div>
            <ToastContainer />
            <h1>Reset your password</h1>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
                <input type="password" placeholder="Confirm Password" onChange={handleChange('password2')} value={password2} />
                <button type="submit">Reset Password</button>
                <a href="/login" target="_blank">Login</a>
            </form>
        </div>
    )
}

export default Reset
