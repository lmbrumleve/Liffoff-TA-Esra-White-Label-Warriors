import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errorText: ''
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({...formData, [e.target.name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            setError(errorText.response?.data?.message || 'Login failed');
            alert('Login failed:');
        }
    };

    return (
        <>
        <NavBar />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={(e)=>handleChange(e)} required />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={(e)=>handleChange(e)} required />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </form>
            <br></br>
            <Link to="/register" className="btn btn-success btn-lg">Create an Account</Link>
        </>
    );
}