const express = require('express');
const psicoRouter = express.Router();
const { createPsicoHandler, getAllPsicoHandler, getPsicoByEmailHandler} = require('../handlers/HandlerPsico.js');


psicoRouter.post('/createPsico', createPsicoHandler); 
psicoRouter.get('/', getAllPsicoHandler); 
psicoRouter.get('/email',getPsicoByEmailHandler);



module.exports = psicoRouter