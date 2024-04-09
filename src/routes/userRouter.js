const express = require('express');
const userRouter = express.Router();
const { createUserHandler, getAllUserHandler, getUserByEmailHandler} = require('../handlers/HandlerUser.js');


userRouter.post('/createUser', createUserHandler); 
userRouter.get('/', getAllUserHandler); 
userRouter.get('/email',getUserByEmailHandler);

// userRouter.put('/:id', putUser); // Modificar un usuario por ID
// userRouter.delete('/:id', deleteUser); // Borrar un usuario por ID

module.exports = userRouter