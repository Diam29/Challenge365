const { createUser, getAllUsers, getUserByEmail } = require('../controllers/controllerUser.js')

// CREAR UN NUEVO USUARIO
const createUserHandler = async (req, res) => {
  const { uid, displayName, email, photoURL } = req.body;
  console.log('handler de user', req.body)
  try {
    const newUser = await createUser({
      uid,
      displayName,
      email,
      photoURL,
    })
    res.status(200).json(newUser)
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
}

// OBTENER TODOS LOS USUARIOS
const getAllUserHandler = async (req, res) => {
  console.log('entre al handler de usuarios')
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener usuarios' });
  }
}

// OBTENER UN USUARIO POR NOMBRE
const getUserByEmailHandler = async (req, res) => {
  const { email } = req.query
  try {
    const user = await getUserByEmail(email)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = { createUserHandler, getAllUserHandler, getUserByEmailHandler }