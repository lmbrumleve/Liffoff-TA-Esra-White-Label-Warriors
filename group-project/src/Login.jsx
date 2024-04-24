import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom';

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
//added
//     const handleGoogleLogin = async () => {
//       try {
//         // Make a request to the backend server to initiate the Google OAuth2 flow
//         const response = await axios.get('/auth/google');
//         window.location.href = response.data.redirectUrl;
//       } catch (error) {
//         console.error('Error initiating Google login:', error);
//       }
//     };
// // added
//     const handleFacebookLogin = async () => {
//       try {
//         // Make a request to the backend server to initiate the Facebook OAuth2 flow
//         const response = await axios.get('/auth/facebook');
//         window.location.href = response.data.redirectUrl;
//       } catch (error) {
//         console.error('Error initiating Facebook login:', error);
//       }
//     };

    return (
        <>
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
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </form>
            <br></br>
            {/* added */}
            {/* <button onClick={handleGoogleLogin}>Login with Google</button> */}
            {/* <br></br> */}
            {/* added */}
            {/* <button onClick={handleFacebookLogin}>Login with Facebook</button> */}
            {/* <br></br> */}
            <Link to="/register" className="btn btn-success btn-lg">Create an Account</Link>
        </>
    );
}

/*logout:
window.localStorage.removeItem('jwtToken');
router.push('/login');
*/