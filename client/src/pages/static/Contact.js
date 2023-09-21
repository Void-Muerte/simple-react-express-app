import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Layout from '../../components/layouts/Layout'

const Contact = () => {
  return (
    <Layout>
      <h3 className='text-center my-5 py-4'>Contact Us</h3>
        <Row className='justify-content-center py-5'>
            <Col md={6}>
                Contact me at <span className='fst-italic text-primary'>psicologia5086@gmail.com</span>
            </Col>
        </Row>
    </Layout>
  )
}

export default Contact