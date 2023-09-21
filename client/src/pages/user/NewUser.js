import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Layout from '../../components/layouts/Layout';
import { createUser } from '../../services/user.service';
import { Capitalize } from '../../lib/string.helper';

const NewUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');



  const handleReset=()=>{
    setName('');
    setEmail('');
    setCity('');
    setCountry('');
  }
  const submitForm = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      city,
      country,
    };

    try {
      const response = await createUser(payload);
      if (response?.data?.success) {
        const user = response.data.addedUser.name;
        toast.success(`${user} created!`);
        // Optionally, you can reset the form fields here.
        handleReset();
      } else {
        toast.error('An error occurred while creating the user.');
      }
    } catch (error) {
      if (error.response) {
        // Handle specific response errors if needed.
        if(error.response?.data?.errors.body){
          const message = error.response.data.errors.body[0].message;
          toast.error(Capitalize(message));
        }else{
          toast.error('An error occurred with the response.');
        }
      } else if (error.request) {
        // Handle network errors.
        toast.error('Network error: No response from the server.');
      } else {
        // Handle other errors.
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <Layout>
        <Row className="justify-content-center">
            <Col lg={6}>
                <Form onSubmit={submitForm} className='mt-5'>
                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='name'
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder='Email'
                            value={email}
                            required
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='city'
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='country'
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Add User
                    </Button>
                </Form>
            </Col>
        </Row>
    </Layout>
  )
}

export default NewUser;