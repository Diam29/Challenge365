const {  Pacientes, Psicos } = require('../db.js')
const { Sequelize, Op } = require('sequelize');

// BUSCAR TODOS LOS PACIENTES

const getAllPacientes = async (uid) => {
  try {
    const pacientes = await Pacientes.findAll(
      {
        where: {
          uid:uid,
        }
      }
    )
    console.log('controller all pacientes', typeof pacientes[1].fecha)
    return pacientes
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error
  }
}

// CREAR UN NUEVO PACIENTE

const createPacientes = async ({ psicologo, pago, fecha, descripcion, tipoPago, uid}) => {
  try {
    const newPacientes = await Pacientes.create({ psicologo, pago, fecha, descripcion, tipoPago, uid })    
    return newPacientes
  } catch (error) {
    console.error('Error al crear paciente: desde controler', error);
    throw error
  }
} 


// BORRAR UN PACIENTE
const deletePacientes = async (uid) => {
  try {
    const deleted = await Pacientes.destroy({
      where: {
        id: uid
      }
    })
    if (deleted === 0) {
      throw new Error(`No se pudo borrar el paciente con id ${uid}`)
    }
    return `Se elimino el paciente con id ${uid}`
  } catch (error) {
    console.error('Error al borrar paciente:', error);
    throw error
  }
}

// OBTENER UN PACIENTE
const getOnePaciente = async (id) => {
  try {
    const paciente = await Pacientes.findByPk(id)   
    if(paciente === null || paciente === undefined) {
      throw new Error(`No se encontraron pacientes con el id ${id}`)	
    }
    return paciente
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    throw error
  }
}

// FILTRAR POR DESTINATARIO

const getPacientePsicologoControl = async (psicologo, uid) => {
  recipient = recipient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  try {
    const pacientes = await Pacientes.findAll({
      where: {
        recipient: {
          [Op.iLike]: `%${psicologo}%`
        },
        uid: {
          [Op.eq]: uid
        }
      }
    })
    if (pacientes.length === 0) {
      throw new Error(`No se encontraron pacientes para el destinatario ${recipient}`)
    }
    return pacientes
  } catch (error) {
    console.error(`Error al obtener pacientes del destinatario ${recipient}`, error);
    throw error
  }
}


// FILTRAR POR FECHA
const getPacientesFechaControl = async (fecha, uid) => {

  try {
    const pacientes = await Pacientes.findAll({
      where: {
        fecha: fecha,
        uid: uid
      }
    });

    if (pacientes.length === 0) {
      throw new Error(`No se encontraron pacientes para la fecha: ${fecha}`);
    }

    return pacientes;

  } catch (error) {
    console.error('Error al obtener pacientes por fecha:', error);
    throw error;
  }
};


// FILTRAR POR TIPO
const getPacienteTipoControl = async (tipoPago, uid) => {
  try {
    tipoPago = tipoPago.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    console.log('entre al control de type', tipoPago, uid)

  const pacientes = await Pacientes.findAll({

    where: {
      tipoPago: tipoPago,
      uid: uid
    }
  })
  

    if (pacientes.length === 0) {
      throw new Error(`No se encontraron pacientes realizados con ${tipoPago}`)
    }
    return pacientes
  } catch (error) {
    console.error('Error al obtener pacientes por tipo:', error);
    throw error
  }
}

module.exports = { getAllPacientes, createPacientes, deletePacientes, getOnePaciente, getPacientePsicologoControl, getPacientesFechaControl, getPacienteTipoControl }
