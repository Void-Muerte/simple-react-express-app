import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import {  toast } from 'react-toastify';
import { List } from 'react-content-loader'
/**
 * local imports
 */
import Layout from '../../components/layouts/Layout';
import { fetchUsers } from '../../services/user.service';
import UserCard from '../../components/user/UserCard';


const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const fetchUsersList = async ()=>{
            try {
                setIsLoading(true);
                const res = await fetchUsers();
                const rUsers = res.data.users;
                if(rUsers){
                    setUsers(rUsers);
                }
            } catch (error) {
                if(error.response?.data.error){
                    setErrorMessage(error.response.data.error);
                    toast.error(error.response.data.error);
                }else if(error.request){
                    const message = 'Network error: No response from the server';
                    setErrorMessage(message);
                    toast.error(message);
                }else{
                    setErrorMessage(error.message);
                    toast.error(error.message);
                }
                setUsers(null);
            }finally{
                setIsLoading(false);
            }
        }
         fetchUsersList();
        // eslint-disabled-next-line
    },[]);
  return (
    <Layout>
        {isLoading?(<div className='text-center py-5'>
            <List backgroundColor='#322' />
        </div>):(
            errorMessage?(<h1 className='text-info text-center pt-5'>{errorMessage}</h1>):(
                <>
                    <h3 className='text-center pt-5 pb-5'>Users</h3>
                    <Row className='justify-content-md-center'>
                        
                        {users&&Object.values(users).map((user)=><UserCard user={user} key={user.id} />)}
                    </Row>
                </>
            )
        )}
    </Layout>
  )
}

export default UsersList;