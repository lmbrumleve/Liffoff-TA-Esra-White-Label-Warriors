import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Link, Navigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
//import { doSignInWithEmailAndPassword,
import { doSignInWithGoogle } from './firebase/auth';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', formData);
            localStorage.setItem("token", response.data['token']);
            console.log(localStorage.getItem('token'));
        } catch (error) {
            console.error('Login failed:', error);
        }

    };

    const { userLoggedIn } = useAuth(); //checks if user is already logged in
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     if(!isSigningIn) {
    //         setIsSigningIn(true);
    //         await doSignInWithEmailAndPassword(email, password);
    //         doSendEmailVerification();
    //     }
    // }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        // doSignInWithGoogle()
        if(!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false);
            })
        }
    }

    const navigate = useNavigate();

    return (
        <>
        {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
        <NavBar />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <br></br>
                <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                // disabled={isSigningIn}
                >Log In{/*{isSigningIn ? 'Logging in...' : 'Log In'}*/}
                </button>
            </form>
            <br></br>
            <div>
            <GoogleButton className="btn btn-secondary btn-lg" onClick={(e) => { onGoogleSignIn(e) }}/>
            </div>
            <br></br>
            {/* <button className="btn btn-secondary btn-lg" onClick={handleFacebookLogin}>Login with Facebook</button>
            <br></br> 
            <br></br> */}
            <Link to="/register" className="btn btn-success btn-lg">Create an Account</Link>
        </>
    );
}
