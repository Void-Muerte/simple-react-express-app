import React from 'react';
import {Nav, Container, Navbar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  return (
    <Navbar bg="light" fixed='top' data-bs-theme="light" >
        <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">Void Users</Navbar.Brand>
        <Nav className="flex-grow-1 justify-content-end">
            <Nav.Link  as={NavLink} className="" to="/create"><strong>Create User</strong></Nav.Link>
        </Nav>
        </Container>
    </Navbar>
  )
}

export default Navigation;