const {insert, show, destroy, update, index} = require('../models/persistence/user.dto');

/**
 * service for inserting new user
 * @param {object} details 
 * @returns {object} addUser
 */
const addUser = (details)=>{
   return insert(details);
}

/**
 * service for getting a user by id
 * @param {integer} userId 
 * @returns {object} user
 */
const getUser = (userId)=>{
   return show(userId);
}

/**
 * service for deleting a user by its id
 * @param {integer} userId 
 * @returns 
 */
const deleteUser = (userId)=>{
   return destroy(userId);
}

/**
 * service for updating user
 * @param {object} user 
 * @returns {object} updatedUser
 */
const updateUser = (user)=>{
    return update(user);
}

/**
 * service for searching all users
 * @returns {{object[]]} users
 */
const getAllUsers = ()=>{
    return index();
}
module.exports = { getAllUsers, addUser, deleteUser, getUser, updateUser};