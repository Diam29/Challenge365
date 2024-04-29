const { createPsico, getAllPsicos, getPsicoByEmail } = require('../controllers/controllerPsico.js')

// CREAR UN NUEVO PSICOLOGO
const createPsicoHandler = async (req, res) => {
  const { uid, displayName, email, photoURL } = req.body;
  console.log('handler de user', req.body)
  try {
    const newPsico = await createPsico({
      uid,
      displayName,
      email,
      photoURL,
    })
    res.status(200).json(newPsico)
  } catch (error) {
    console.error('Error al registrar nuevo psicólogo:', error);
    res.status(400).json({ error: 'Error al registrar un nuevo psicólogo' });
  }
}

// OBTENER TODOS LOS PSICOLOGOS
const getAllPsicoHandler = async (req, res) => {
  try {
    const psicos = await getAllPsicos()
    res.status(200).json(psicos)
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener psicólogos' });
  }
}

// OBTENER UN PSICOLOGOS POR NOMBRE
const getPsicoByEmailHandler = async (req, res) => {
  const { email } = req.query
  try {
    const psico = await getPsicoByEmail(email)
    res.status(200).json(psico)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = { createPsicoHandler, getAllPsicoHandler, getPsicoByEmailHandler }