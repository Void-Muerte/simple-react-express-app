import React from 'react'
import Layout from '../../components/layouts/Layout'
import { Col, Row } from 'react-bootstrap'

const About = () => {
  return (
    <Layout>
        <h3 className='text-center my-5 py-4'>About Us</h3>
        <Row className="justify-content-center">
            <Col md={6}>
                This is a project which demonstrate basic CRUD operations in React frontend and basic express api
                <br />
                Some of the important things to note are logging, access rate limiting which limits amount of requests from the same api a defined period of
                time
            </Col>
        </Row>
    </Layout>
  )
}

export default About