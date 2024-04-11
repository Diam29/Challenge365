const { Users } = require('../db.js')
const { Sequelize, Op } = require('sequelize')
const unorm = require('unorm')

const createUser = async ({ uid, displayName, email, photoURL }) => {
  console.log('controler de user', uid, displayName, email, photoURL)
  try {
    const [user, created] = await Users.findOrCreate({
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
      return 'El usuario ya existe', user
    } else {
      return `El usuario ${displayName} ha sido guardado con éxito `
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error
  }
}

const getAllUsers = async () => {
  try {
    const users = await Users.findAll()
    return users
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error
  }
}



const getUserByEmail = async (email) => {
  try {

    const user = await Users.findOne({
      where: {
        email: {

          [Op.eq]: email
        }
      }
    })
    if (!user) {
      throw new Error(`No existe un usuario con el email ${email}`);
    }

    console.log('user del controller', user);
    return user;

  } catch (error) {
    console.error('Error al obtener usuario por nombre:', error);
    throw error
  }
}


module.exports = { createUser, getAllUsers, getUserByEmail }