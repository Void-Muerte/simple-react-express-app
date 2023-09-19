const {StatusCodes} = require('http-status-codes');
const logger = require('pino')();

/**
 * local imports
 */
const {addUser, getAllUsers, updateUser, getUser, deleteUser} = require('../services/user.service');

/**
 * declarations
 */

// const logger = pino();



/**
 * adds user
 * @param {object} req 
 * @param {object} res 
 * @returns {object} message, updatedUser
 */
const addUserController =  (req, res)=>{
        const {body:user} = req;
        // insert user and get the inserted user
        const addedUser = addUser(user);
        logger.info('Creating user')
        return res.status(StatusCodes.CREATED).json({success:true, addedUser:addedUser});

}
/**
 * get all users
 * @param {object} req 
 * @param {object} res 
 * @returns {object[]} users
 */
const getUsersController = (req, res)=>{
    const users = getAllUsers();
    logger.info('retrieving users')
    if(!users || !users.length){
        return res.status(StatusCodes.NOT_FOUND).json({error:"users are not found"})
    }
    return res.status(StatusCodes.OK).json({users});
}
/**
 * search user by id
 * @param {object} req 
 * @param {object} res 
 * @returns {object} user
 */
const getUserController = (req, res)=>{
    const id = parseInt(req.params.id);
    const foundUser = getUser(id);
    logger.info(`user with id ${id} is retrieved!`)
    if(!foundUser){
        return res.status(StatusCodes.NOT_FOUND).json({error:"user not found"});
    }
    return res.status(StatusCodes.OK).json({success:true,user:foundUser});
}
/**
 * delete user by id
 * @param {object} req 
 * @param {object} res 
 * @returns {object} message, deletedUser
 */
const deleteUserController =(req, res)=>{
    const id = parseInt(req.params.id);
    const success = deleteUser(id);
    logger.info(`deleting user with ID ${id}`);
    if(!success){
        return res.status(StatusCodes.NOT_FOUND).json({error:`user with id (${id}) was not found!`});
    }
    return res.status(StatusCodes.OK).json({success:true, message:"delete successful", deletedUser:success});
}
/**
 * updates user by id
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updatedUser
 */
const updateUserController = (req, res)=>{
    const id = parseInt(req.params.id);
    const user = {...req.body, id:id}
    const updatedUser = updateUser(user);
    logger.info(`updating user with ID ${id}`);
    if(!updatedUser){
        return res.status(StatusCodes.NOT_FOUND).json({error:` user with id ${id} not found`});
    }
    return res.status(StatusCodes.OK).json({updatedUser:updatedUser});
}

module.exports ={addUserController, getUsersController, getUserController, updateUserController, deleteUserController};