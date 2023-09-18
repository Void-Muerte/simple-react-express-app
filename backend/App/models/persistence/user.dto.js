const users = require('../data/user.data');

/**
 * insert new user and return the inserted user
 * @param {object} details 
 * @returns {object} user
 */
const insert = (details)=>{
    // users[0] for first user but it is to not
    const newUser = {...details, id:users.length+1}
    users.push(newUser);
    return users.find(user=>user.id===users.length);
}
/**
 * search and find user by id
 * @param {number} Id 
 * @returns {object} foundUser
 */
const show = (Id)=>{
    const foundUser = users.find((user)=>user.id===Id) || null;
    return foundUser;
}
/**
 * delete user by id
 * @param {number} userId 
 * @returns {object} user
 */
const destroy = (userId)=>{
    const removeUser = (user, index)=>{
        if(user.id===userId){
            // remove the array element of the found user
            users.splice(index, 1);
            return true;
        }
        return false;
    };
    return users.find(removeUser);
}
/**
 * returns list of all users 
 * @returns {array} users
 */
const index = ()=>{
    return users;
}
/**
 * update user by id
 * @param {object} newDetails 
 * @returns {object} updatedUser
 */
const update = (newDetails)=>{
    let currentUser = null;
    let userIndex ;
    users.map((user, index)=>{
        if(newDetails.id===user.id){
            currentUser=user;
            userIndex = index;
        }
    });
    if(!currentUser){
        return null;
    }
    const updatedUser = {
        ...currentUser,
        ...newDetails
    }
    users.splice(userIndex, 1, updatedUser)
    return updatedUser;
}

module.exports = {index, insert, show, update, destroy};