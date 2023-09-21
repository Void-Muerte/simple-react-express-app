import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Container>
        <Row className='justify-content-center align-items-center'>
            <Col md={{span:3, offset:1}}>
                <h4>Contact</h4>
                <NavLink to='/contact' className="text-decoration-none">contact</NavLink>
            </Col>
            <Col md={{span:3, offset:1}}>
                <h4>User</h4>
                <NavLink to='/create' className="text-decoration-none">create a user</NavLink>
            </Col>
            <Col md={{span:3, offset:1}}>
                <h4>About Us</h4>
                <NavLink to='/about' className='text-decoration-none'>About Us</NavLink>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer