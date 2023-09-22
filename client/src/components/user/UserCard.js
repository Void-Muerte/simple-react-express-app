import React from 'react';
import { Button, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



const UserCard = ({user}) => {
  return (
    <Col lg={3} className='p-1'>
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
  )
}

export default UserCard;