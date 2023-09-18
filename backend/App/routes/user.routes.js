const express = require('express');
const {StatusCodes} = require('http-status-codes');
const {expressYupMiddleware} = require('express-yup-middleware');


// import local modules

const {addUserSchema, updateUserSchema, getUserSchema, deleteUserSchema} = require('../schemas/user.schema');
const {addUserController, getUsersController, getUserController, updateUserController, deleteUserController} = require('../controllers/user.controller');
const userRouter = express.Router();


// routes


// add user
userRouter.post('/add',expressYupMiddleware({
    schemaValidator:addUserSchema,
    expectedStatusCode:StatusCodes.BAD_REQUEST}),
    addUserController
);

// get all users
userRouter.get('/users', getUsersController);


// update user
userRouter.put('/user/update/:id',expressYupMiddleware({
    schemaValidator:updateUserSchema,
    expectedStatusCode:StatusCodes.BAD_REQUEST}), updateUserController);

// find user/ show by id
userRouter.get('/user/:id', expressYupMiddleware({
    schemaValidator:getUserSchema,
    expectedStatusCode:StatusCodes.BAD_REQUEST
}), getUserController);

// remove user
userRouter.delete('/user/:id', expressYupMiddleware({
    schemaValidator:deleteUserSchema,
    expectedStatusCode:StatusCodes.BAD_REQUEST
}), deleteUserController)


module.exports=userRouter;