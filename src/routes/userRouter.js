const express = require('express');
const userRouter = express.Router();
const { createUserHandler, getAllUserHandler, getUserByEmailHandler} = require('../handlers/HandlerUser.js');


userRouter.post('/createUser', createUserHandler); 
userRouter.get('/', getAllUserHandler); 
userRouter.get('/email',getUserByEmailHandler);



module.exports = userRouter