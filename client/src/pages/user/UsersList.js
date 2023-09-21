import React, { useEffect, useState } from 'react';
import { Row, Card, Col, Button } from 'react-bootstrap';
import Layout from '../../components/layouts/Layout';
import {  toast } from 'react-toastify';
import { fetchUsers } from '../../services/user.service';
import { NavLink } from 'react-router-dom';


const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsersList = async ()=>{
            try {
                const res = await fetchUsers();
                const rUsers = res.data.users;
                if(rUsers){
                    setUsers(rUsers);
                }
            } catch (error) {
                if(error.response?.data.error){
                    toast.error(error.response.data.error);
                }else if(error.request){
                    toast.error('Network error: No response from the server');
                }else{
                    toast.error(error.message);
                }
                setUsers(null);
            }
        }
         fetchUsersList();
        // eslint-disabled-next-line
    },[]);
    const renderedUsers = users&& (Object.values(users).map((user)=>{
        return (
                <Row className='justify-content-center mb-2' key={user.id}>
                    <Col lg={3}>
                        <Card>
                            <Card.Body>
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                                {
                                    user.city && user.country &&(
                                        <p>{`${user.city} - ${user.country}`}</p>
                                    )
                                }
                                <Button variant='primary' as={NavLink} to={`/edit/${user.id}`}>Edit User</Button>
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
        );
    }))
  return (
    <Layout>
        <h3 className='text-center pt-5 pb-5'>Users</h3>
        <Col className='justify-content-md-center'>
            {renderedUsers&&renderedUsers}
        </Col>
    </Layout>
  )
}

export default UsersList;