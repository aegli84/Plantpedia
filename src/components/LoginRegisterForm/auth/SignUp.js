
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../auth/signup.css';

    const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                //alert('ok done');
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signupForm = () => (
    <div className= "mainDiv">
        <form className="form-styling">
            <div className="form-group">
                <label className="label-text">Full Name</label>
                <input className="input-box" onChange={handleChange('name')} value={name} type="text"/>
            </div>

            <div className="form-group">
                <label className="label-text">Email</label>
                <input className="input-box" onChange={handleChange('email')} value={email} type="email"/>
            </div>

            <div className="form-group">
                <label className="label-text">Password</label>
                <input className="input-box" onChange={handleChange('password')} value={password} type="password"/>
            </div>

            <div>
                <button className="sub-btn" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
        </div>
    );

    return (
        <div className="hello">
            <div className="secondary">
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null} 
                <div className="headers">
                    <h2>Register</h2>
                    <h1>Create an account.</h1>
                    <h3>Already have an account?<Link to = "/signin" style={{textDecoration: "underline" , color:"#83a46f"}}>Login here </Link></h3>
                </div>
                {signupForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn-pass">
                    Forgot Password
                </Link>
            </div>
        </div>
    );
};

export default Signup;