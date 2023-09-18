const express = require('express');
const Router = express.Router();
const {StatusCodes} = require('http-status-codes');
// general test route
Router.get('/', (req, res)=>{
    res.status(StatusCodes.OK).json({message:'Hello world'});
});

module.exports=Router;