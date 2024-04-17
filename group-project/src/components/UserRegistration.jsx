import React, { useState } from 'react'
import NavBar from "./NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';

export default function UserRegistration() { 
    const [formData, setFormData] = useState({
        email:'',
        password: '',
        firstName: '',
        lastName: '',
        defaultCurrency: '',
        role: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevstate => ({
            ...prevstate,
            [name]:value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/capstone/users', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };
    return(
    <div>
        <NavBar />

        <form method="POST">
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="defaultCurrency">Default Currency</label>
                <input type="text" className="form-control" id="defaultCurrency" name="defaultCurrency" value={formData.defaultCurrency} onChange={handleChange} />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <br />

            <input type="submit" onClick={handleSubmit}/>
        </form>
    </div>
    );
}