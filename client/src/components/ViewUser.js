import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Col, Card, Row } from 'react-bootstrap';
import {  toast } from 'react-toastify';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { URL } from '../lib/urls';
import Layout from './Layout';

/**
 * a styled component is still a component and thus should be defined outside another component
 */
const Notice = styled.p`
margin:1.25em auto;
font-size:2em;
font-weight:600;
`;

const ViewUser = () => {
    const {id} = useParams();
    const url = URL+`/user/${id}`;
    const [user, setUser] = useState(null);
    const fetchUser = async()=>{
        try {
            const response = await axios.get(url, {
                headers:{
                    'Content-type':'application/json'
                }
            });
            if(response.data.success){
                setUser(response.data.user)
            }
        } catch (error) {
            if(error.response?.data?.errors){
                toast.error("Invalid user ID");
            }else if(error.response?.data.error){
                toast.error(error.response.data.error);
            }else if(error.request){
                toast.error('Network error: No response from the server');
            }else{
                toast.error(error.message);
            }
            setUser(null);
        }

    };
    useEffect(()=>{
        fetchUser();
        // eslint-disable-next-line 
    },[id]);

  return (
    <Layout>
        {user?(
            <Row className='justify-content-center'>
                <Col lg={4}>
                    <h3 className='my-5 text-center'>{user.name}</h3>
                    <Card>
                        <Card.Body className='text-center'>
                            <p>{user.email}</p>
                            {
                                user.city && user.country &&(
                                    <p>{`${user.city} - ${user.country}`}</p>
                                )
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        ):(
            <Container>
                <Notice>User cannot be found</Notice>
            </Container>
            
        )}

    </Layout>
  )
}

export default ViewUser;