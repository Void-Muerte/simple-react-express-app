import React, { useEffect, useState } from 'react';
import { URL } from '../lib/urls';
import axios from 'axios';
import { Row, Card, Col } from 'react-bootstrap';


const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const res = await axios.get(`${URL}/users`);
            const rUsers = res.data.users;
            if(rUsers){
                setUsers(rUsers);
            }
        }
         fetchUsers();
        // eslint-disabled-next-line
    },[]);
    const renderedUsers = Object.values(users).map((user, index)=>{
        return (
                <Row className='justify-content-center mb-4' key={index}>
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
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
        );
    })
  return (
    <>
        <h3 className='text-center pt-5 pb-5'>Users</h3>
        <Col className='justify-content-md-center'>
            {renderedUsers}
        </Col>
    </>
  )
}

export default UsersList;