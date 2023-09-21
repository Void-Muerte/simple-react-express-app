import React, { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Layout from '../../components/layouts/Layout';
import { deleteUserById } from '../../services/user.service';
import { Button, Col, Row, Card } from 'react-bootstrap';


const RemoveUser = () => {
    const {id} = useParams();
    const [done, setDone] = useState(false);
    const navigate = useNavigate();
    /**
     * redirect user to home should user cancel deletion operation
     * @returns void
     */
    const cancelAction= ()=>navigate('/',{replace:true});
    /**
     * callback for deleting user by provided id
     */
    const deleteUser = async()=>{
        try {
            const response = await deleteUserById(id);
            if(response.data.success){
                const user = response.data.deletedUser.name;
                toast.success(`${user} is deleted successfully!`)
                setDone(true);
            }
        } catch (error) {
            if(error.response?.data?.errors){
                toast.error(`Invalid user ID (${id})`);
            }else if(error.response?.data.error){
                toast.error(error.response.data.error);
            }else if(error.request){
                toast.error('Network error: No response from the server');
            }else{
                toast.error(error.message);
            }
            setDone(true);
        }

    };
    useEffect(()=>{
        let timer;
        if(done){
            timer = setTimeout(()=>{
                navigate('/',{replace:true});
            },1500)
        }
        return ()=>{
            clearTimeout(timer)
        }
        // eslint-disable-next-line
    },[done])
  return (
    <Layout>
        <Row className='justify-content-center py-5'>
            <Col lg={3}>
                <Card className='text-center'>
                    <Card.Header>Are you sure you want to delete?</Card.Header>
                    <Card.Body>
                        <Button  className='px-4' variant="outline-warning"  onClick={cancelAction}>No</Button>
                        <Button className="px-4 mx-3" variant='danger' onClick={deleteUser}>Yes</Button>
                    </Card.Body>

                </Card>
            </Col>
        </Row>
    </Layout>
  )
}

export default RemoveUser;
// {
// 	"success": true,
// 	"message": "delete successful",
// 	"deletedUser": {
// 		"name": "Mira Jane",
// 		"email": "mirababy@hotmail.com",
// 		"city": "Magnolia",
// 		"country": "Fiore",
// 		"id": 8
// 	}
// }