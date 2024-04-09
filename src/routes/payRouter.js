const express = require('express');
const payRouter = express.Router();
const {createPaymentHandler, getAllPaymentHandler, putPaymentHandler, deletePaymentHandler, getPaymentHandler, getPaymentRecipientHandler, getPaymentTypeHandler, getPaymentDateHandler } = require('../handlers/handlerPayment.js');

payRouter.get('/', getAllPaymentHandler)
payRouter.post('/', createPaymentHandler) 
payRouter.put('/:id', putPaymentHandler)
payRouter.delete('/:id', deletePaymentHandler)
payRouter.get('/:id', getPaymentHandler)
payRouter.get('/recipient/:recipient', getPaymentRecipientHandler)
payRouter.get('/date/:date', getPaymentDateHandler)
payRouter.get('/type/:type', getPaymentTypeHandler)


module.exports = payRouter
