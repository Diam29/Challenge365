const { Router } = require('express');
const userRouter = require('./userRouter.js')
const payRouter = require('./payRouter.js')

const router = Router();

router.use('/user', userRouter)
router.use('/pay', payRouter)


module.exports = router;