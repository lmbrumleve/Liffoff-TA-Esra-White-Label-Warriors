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
//     const GoogleLogin = async () => {
//         await GoogleSignin;
//         const userInfo = await GoogleSignin.signIn();
//         return userInfo;
//     }
//     const [loading, setLoading] = useState(false);
// // added
//     const handleGoogleLogin = async () => {
//         setLoading(true);
// 		try {
// 			const response = await GoogleLogin();
// 			const { idToken, user } = response;

// 			if (idToken) {
// 				const resp = await authAPI.validateToken({
// 					token: idToken,
// 					email: user.email,
// 				});
// 				await handlePostLoginData(resp.data);
// 			}
// 		} catch (apiError) {
// 			setError(
// 				apiError?.response?.data?.error?.message || 'Something went wrong'
// 			);
// 		} finally {
// 			setLoading(false);
// 		}

//     //   try {
//     //     // Make a request to the backend server to initiate the Google OAuth2 flow
//     //     const response = await axios.get('/auth/google');
//     //     window.location.href = response.data.redirectUrl;
//     //   } catch (error) {
//     //     console.error('Error initiating Google login:', error);
//     //   }
//     };

//     const handleGoogleLogout = async () => {
//         try {
//             await GoogleSignin.signOut();
//             // Perform additional cleanup and logout operations.
//         } catch (error) {
//             console.log('Google Sign-Out Error: ', error);
//         }
//     }
    
//     const receiveGoogleToken = async () => {
//         const googleToken = await axios({
//             method: 'get',
//             url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
//             withCredentials: true,
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             body:JSON.stringify(formData)
//         }). then(res=>res.json()).then((result)=>{
//         localStorage.setItem("token", result['token']);
//                 console.log(localStorage.getItem('token'));
//                 console.log(result['token']);
//     })
    

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
            {/* <button className="btn btn-secondary btn-lg" onClick={handleGoogleLogin}>Login with Google</button>
            <br></br> 
            <br></br> */}
            <Link to="/register" className="btn btn-success btn-lg">Create an Account</Link>
        </>
    );
}
