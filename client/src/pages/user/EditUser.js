import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import { Form, Button, Row, Col } from 'react-bootstrap';


/**
 * local imports
 */
import { editUserById, getUserById } from '../../services/user.service';
import Layout from '../../components/layouts/Layout';
import { Capitalize } from '../../lib/string.helper';


const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const {id} = useParams();
    const [valid, setValid] = useState(true);

    const submitForm = async(e)=>{
        e.preventDefault();
        const payload = {
            name,
            email,
            city,
            country,
          };
          try {
            const response = await editUserById(id,payload);
            if (response?.data?.success) {
                const userName = response.data.updatedUser.name;
              toast.success(`${userName} udpated successfully!`);
              // Optionally, you can reset the form fields here.
            } else {
              toast.error('An error occurred while creating the user.');
            }
          } catch (error) {
            if (error.response) {
                // Handle specific response errors if needed.
                if(error.response?.data?.errors?.body){
                  const message = error.response.data.errors.body[0].message;
                  toast.error(Capitalize(message));
                }else{
                  toast.error('An error occurred with the response.');
                }
            } else if (error.request) {
                // Handle network errors.
                toast.error('Network error: No response from the server.');
            }else {
                // Handle other errors.
                toast.error('An unexpected error occurred.');
            }
          }
    }
    const fetchUser = async()=>{
        try {
            const response = await getUserById(id);
            if(response.data.success){
                const user = response.data.user;
                setName(user.name);
                setEmail(user.email);
                user.city&&setCity(user.city);
                user.country&&setCountry(user.country);
            }
        } catch (error) {
            if(error.response?.data?.errors){
                toast.error(`Invalid user ID (${id})`);
                setValid(false);
            }else if(error.response?.data.error){
                setValid(false);
                toast.error(error.response.data.error);
            }else if(error.request){
                toast.error('Network error: No response from the server');
            }else{
                toast.error(error.message);
            }
        }

    };
    useEffect(()=>{
        if(typeof parseInt(id)==='number'){
            fetchUser();
        }else{
            toast.error(`Invalid user ID (${id})`);
            setValid(false);
        }
        // eslint-disable-next-line
    },[id])
  return (
    <Layout>
        {valid?(
            <Row className="justify-content-center">
                <Col lg={6} className='mt-5'>
                    <h2 className='text-center'>Edit User</h2>
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
                        <Button variant='danger' as={NavLink} to={`/remove/${id}`} className='mr-4' disabled={!valid}>
                            delete User
                        </Button>
                        <Button variant='primary' type='submit' className='mx-4' disabled={!valid}>
                            update User
                        </Button>
                    </Form>
                </Col>
        </Row>
        ):(<h2 className='text-danger text-center py-5 fw-bold'>{`User not found`}</h2>)}
    </Layout>
  )
}

export default EditUser;