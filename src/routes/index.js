const { Router } = require('express');
const psicoRouter = require('./psicoRouter.js')
const pacienteRouter = require('./pacienteRouter.js')

const router = Router();

router.use('/psico', psicoRouter)
router.use('/paciente', pacienteRouter)


module.exports = router;