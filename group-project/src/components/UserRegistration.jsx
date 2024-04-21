import React, { useRef, useState } from 'react'
import NavBar from "./NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function UserRegistration() {

    const [formData, setFormData] = useState({
        email:'',
        password: '',
        firstName: '',
        lastName: '',
        defaultCurrency: '', //edit
    });

    const userUsername = useRef('');
    const userFirstName = useRef('');
    const userLastName = useRef('');
    const userEmail = useRef('');
    const userPassword = useRef('');

    const auth = () => {
        return axios.create({
            baseURL: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
            }
        });
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({...formData, [e.target.name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        userUsername.current.value = '';
        userFirstName.current.value = '';
        userLastName.current.value = '';
        userEmail.current.value = '';
        userPassword.current.value = '';
        try {
            const token = "your_bearer_token"
            const instance = auth(token);
            await axios.post('/register', formData);
            alert("User registration successful");
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };
    return(
    <div>
        <NavBar />
        <form>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" ref={userFirstName} value={formData.firstName} onChange={(e)=>handleChange(e)} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" ref={userLastName} value={formData.lastName} onChange={(e)=>handleChange(e)} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" ref={userEmail} value={formData.email} onChange={(e)=>handleChange(e)} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" ref={userUsername} value={formData.userUsername} onChange={(e)=>handleChange(e)} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="defaultCurrency">Default Currency</label>
                <input type="text" className="form-control" id="defaultCurrency" name="defaultCurrency" value={formData.defaultCurrency} onChange={(e)=>handleChange(e)} />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" ref={userPassword} value={formData.password} onChange={(e)=>handleChange(e)} required />
            </div>
            <br />

            <button type="submit" className="btn btn-success btn-lg" onClick={handleSubmit}>Register</button>
        </form>
    </div>
    );
}