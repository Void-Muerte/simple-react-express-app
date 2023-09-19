import React from 'react';
import {Nav, Container, Navbar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  return (
    <Navbar bg="primary" fixed='top' data-bs-theme="dark" >
        <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">Void Users</Navbar.Brand>
        <Nav className="flex-grow-1 justify-content-end">
            <Nav.Link  as={NavLink} to="/create">Create User</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
  )
}

export default Navigation;