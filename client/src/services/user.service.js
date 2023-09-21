import {URL} from '../lib/urls';
import axios from 'axios';

/**
 * get list of users
 * @returns {[]} users
 */
export const fetchUsers = async()=>{
    return axios.get(`${URL}/users`);
}

/**
 * service to return user
 * @param {object} payload 
 * @returns {object} user
 */

export const createUser = async(payload)=>{
   return await axios.post(`${URL}/add`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
}

export const getUserById = async(id)=>{
    const url = URL+`/user/${id}`;
    return await axios.get(url, {
        headers:{
            'Content-type':'application/json'
        }
    });
}
export const editUserById = async(id,payload)=>{
    return await axios.put(`${URL}/user/update/${id}`,JSON.stringify(payload),{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const deleteUserById = async (id)=>{
    return await axios.delete(`${URL}/user/${id}`,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}
