import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import UserDashboard from '../UserDashboard';

export default class NavBar extends Component {
    render() {
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
              <NavDropdown.Item as={Link} to="/trips">Trips</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions">Transactions</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions/add">New Transaction</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link  as={Link} to={"/transactions/add"}>
              Create New Transaction
            </Nav.Link> */}
          </Nav>
          <Nav.Link  as={Link} to={"/login"}>
          <Button className="loginbutton" variant="info">Login</Button>
          <Nav
            className="loginbutton"
            style={{border: "1px solid blue"}}
          />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </div>

        )
    }
}