import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const navbar = () => (
    <div className="Navbar">
        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link className="nav-link" to="/"><strong>Magic buttons</strong></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/buttons">Buttons</Link>
                    <Link className="nav-link" to="/link">Customize</Link>
                </Nav>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

export default navbar;