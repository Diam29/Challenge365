const express = require('express');
const pacienteRouter = express.Router();
const {createPacienteHandler, getAllPacienteHandler, putPacienteHandler, deletePacienteHandler, getOnePacienteHandler, getPacientesPsicologoHandler, getPacientesTipoHandler, getPacientesFechaHandler } = require('../handlers/handlerPaciente.js');

pacienteRouter.get('/:uid', getAllPacienteHandler)
pacienteRouter.post('/', createPacienteHandler)
pacienteRouter.put('/:id', putPacienteHandler)
pacienteRouter.delete('/:id', deletePacienteHandler)
pacienteRouter.get('/one/:id', getOnePacienteHandler)
pacienteRouter.get('/psicologo/:psicologo/psico/:uid', getPacientesPsicologoHandler)
pacienteRouter.get('/fecha/:fecha/psico/:uid', getPacientesFechaHandler)
pacienteRouter.get('/tipoPago/:tipoPago/psico/:uid', getPacientesTipoHandler)


module.exports = pacienteRouter
