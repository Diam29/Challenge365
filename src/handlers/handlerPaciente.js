const {getAllPacientes, createPacientes, deletePaciente, deletePacientes, getOnePaciente, getPacientePsicologoControl,getPacientesFechaControl, getPacienteTipoControl } = require('../controllers/controllerPacientes.js')
const { Pacientes } = require('../db.js');


// OBTENER TODOS LOS PACIENTES

const getAllPacienteHandler = async (req, res) => {
  const { uid } = req.params
  try {
    const pacientes = await getAllPacientes(uid)
    res.status(200).json(pacientes)
  } catch (error) {
    console.error(error || 'Error al obtener pacientes');
    res.status(400).json({ error: error.message });
  }
}

// CREAR UN NUEVO PACIENTE
const createPacienteHandler = async (req, res) => {
  const { psicologo, pago, fecha, descripcion, tipoPago, uid } = req.body

  if (!psicologo || !pago || !fecha || !descripcion || !tipoPago || !uid) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    const newPaciente = await createPacientes({
      psicologo,
      pago,
      fecha,
      descripcion,
      tipoPago, 
      uid
    })
    res.status(200).json(newPaciente)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear paciente' });
  }
}

// MODIFICAR UN PACIENTE
const putPacienteHandler = async (req, res) => {
  const { id } = req.params

  try {
    const paciente = await Pacientes.findOne({
      where: {
        id
      }
    })
  payment.set(req.body)
  await payment.save()
  res.status(200).json(paciente)
  } catch (error) {
    console.error('Error al actualizar un paciente:', error);
    res.status(400).json({ error: 'Error al actualizar un paciente' });
  }
}

// BORRAR UN PACIENTE
const deletePacienteHandler = async (req, res) => {
  const { id } = req.params
  try {
    const deletedPaciente = await deletePacientes(id)
    res.status(200).json(deletedPaciente)
  } catch (error) {
    console.error('Error al borrar paciente:', error);
    res.status(400).json({ error: 'Error al borrar paciente' });
  }
}

//  MOSTRAR UN PACIENTE 
const getOnePacienteHandler = async (req, res) => {
  const { id } = req.params
  try {
    const paciente = await getOnePaciente(id)
    res.status(200).json(paciente)
  } catch (error) {
    console.error( error);
    res.status(400).json({ error: 'No se encontraron pacientes' });
  }
}

// FILTRAR POR DESTINATARIO
const getPacientesPsicologoHandler = async (req, res) => {
  const { psicologo, uid } = req.params
  console.log('handler recipient', recipient, uid)
  try {
    const paciente = await getPacientePsicologoControl(psicologo, uid)
    res.status(200).json(paciente)
    } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



// GITHUB FILTRAR POR FECHA: 
const getPacientesFechaHandler = async (req, res) => {
  const { fecha, uid } = req.params;
console.log('entre al handler de date', fecha, uid)
  
  try {
    const paciente = await getPacientesFechaControl(fecha, uid)
    res.status(200).json(paciente)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// FILTRAR POR TIPO
const getPacientesTipoHandler = async (req, res) => {
  const { tipoPago, uid } = req.params
console.log('entre al handler de type', tipoPago, uid)

  try {
    const paciente = await getPacienteTipoControl(tipoPago, uid)
    res.status(200).json(paciente)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 

module.exports = { getAllPacienteHandler, createPacienteHandler, putPacienteHandler, deletePacienteHandler, getOnePacienteHandler, getPacientesPsicologoHandler, getPacientesFechaHandler, getPacientesTipoHandler }