import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
  } from "react-router-dom";
import UserDashboard from '../UserDashboard';
import { useAuth } from '../context/AuthContext.jsx';
import { doSignOut } from '../firebase/auth.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function NavBar() {

      // const {user, logOut} = UserAuth();
      const navigate = useNavigate();

      // const handleSignOut = async () => {
      //   try {
      //     await logOut();
      //     navigate("/");
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }

      const handleLogout = () => {
        window.localStorage.removeItem("token");
        navigate("/");
      }

      const [authUser, setAuthUser] = useState('');

      const {userLoggedIn} = useAuth();

      useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setAuthUser(decodedToken);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
    
        fetchUser();

    }, []);
      
        return (
            // <Router>
            <div>
<Navbar expand="lg" className="bg-body-secondary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">Trip Wallet</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Menu" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/trips">My Trips</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions">Transactions</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions/add">New Transaction</NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link  as={Link} to={"/transactions/add"}>
              Create New Transaction
            </Nav.Link> */}
          </Nav>
          {userLoggedIn ? (
            <Button onClick={() => { doSignOut().then(() => {navigate('/') }) }} variant="submit">Log Out</Button>
          ) : authUser ? (
            <Button onClick={() => { handleLogout() }} variant="submit">Log Out</Button>
          ) : (
            <Button onClick={() => {navigate("/login")}} variant="submit">Log In/Register</Button>
          )}
          <Nav
            className="loginbutton"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </div>

        )
    }