import React, {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {  toast } from 'react-toastify';

import { URL } from '../lib/urls';

const NewUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    
    const handleReset = ()=>{
        setName('');
        setEmail('');
        setCity('');
        setCountry('');
    }
    const submitForm = async(e)=>{
        e.preventDefault();
        const payload = {
            name,
            email,
            city,
            country
        }
        try {
            const response = await axios.post(`${URL}/add`,JSON.stringify(payload),{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.data?.success){
                toast.success('User created successfully!');
                handleReset();

            }else{
                toast.warn('An error has occured!')
            }
        } catch (error) {
            if(error.response.data.errors){
                const message = error.response.data.errors.body[0].message
                toast.error(message[0].toUpperCase() + message.substring(1));
            }else if(error.response){
                toast.error(error.response.error);
            }else if(error.request){
                toast.error('Network error: No response from the server');
            }else{
                toast.error('An unexpected error occured!');
            }
        }
    }
  return (
    <Container className='my-5'>
        <Row className="justify-content-center">
            <Col lg={6}>
                <Form onSubmit={submitForm}>
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
    </Container>
  )
}

export default NewUser;