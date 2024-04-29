const { Psicos } = require('../db.js')
const { Sequelize, Op } = require('sequelize')

const creatPsico = async ({ uid, displayName, email, photoURL }) => {
  console.log('controler de psico', uid, displayName, email, photoURL)
  try {
    const [psico, created] = await Psicos.findOrCreate({
      where: {
        uid
      },
      defaults: {
        uid,
        displayName,
        email,
        photoURL
      }
    })
    if (!created) {
      return 'El usuario ya existe', psico
    } else {
      return `El psicólogo ${displayName} ha sido guardado con éxito `
    }
  } catch (error) {
    console.error('Error al registrar psicólogo:', error);
    throw error
  }
}

const getAllPsicos = async () => {
  try {
    const psicos = await Psicos.findAll()
    if (psicos.length === 0) {
      throw new Error(`No se encontraron psicólogos`)
    }
    return psicos
  } catch (error) {
    console.error('Error al obtener psicólogos:', error);
    throw error
  }
}



const getPsicoByEmail = async (email) => {
  try {

    const psico = await Psicos.findOne({
      where: {
        email: {

          [Op.eq]: email
        }
      }
    })
    if (!psico) {
      throw new Error(`No existe un psicólogo con el email ${email}`);
    }

    console.log('psico del controller', psico);
    return psico;

  } catch (error) {
    console.error('Error al obtener psicólogo por nombre:', error);
    throw error
  }
}


module.exports = { creatPsico, getAllPsicos, getPsicoByEmail }