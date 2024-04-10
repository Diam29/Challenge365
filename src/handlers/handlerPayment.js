const {getAllPayments, createPayment, deletePayment, getPayment, getPayRecipientControl, getPaymentTypeControl, getPaymentDateControl} = require('../controllers/controllerPayment.js');
const { Payments } = require('../db.js');


// OBTENER TODOS LOS PAGOS
const getAllPaymentHandler = async (req, res) => {
  const { uid } = req.params
  console.log('soy handller payment id',uid)
  try {
    const payments = await getAllPayments(uid)
    res.status(200).json(payments)
  } catch (error) {
    console.error(error || 'Error al obtener pagos');
    res.status(400).json({ error: error.message });
  }
}

// CREAR UN NUEVO PAGO
const createPaymentHandler = async (req, res) => {
  const { recipient, amount, date, description, type, uid } = req.body

  if (!recipient || !amount || !date || !description || !type || !uid) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }
  console.log('soy handler', recipient, amount, date, description, type, uid)

  try {
    const newPayment = await createPayment({
      recipient,
      amount,
      date,
      description,
      type, 
      uid
    })
    res.status(200).json(newPayment)
  } catch (error) {
    console.error('Error al crear pago: desde handler', error);
    res.status(400).json({ error: 'Error al crear pago' });
  }
}

// MODIFICAR UN PAGO
const putPaymentHandler = async (req, res) => {
  const { id } = req.params

  try {
    const payment = await Payments.findOne({
      where: {
        id
      }
    })
  payment.set(req.body)
  await payment.save()
  res.status(200).json(payment)
  } catch (error) {
    console.error('Error al actualizar pago:', error);
    res.status(400).json({ error: 'Error al actualizar pago' });
  }
}

// BORRAR UN PAGO
const deletePaymentHandler = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await deletePayment(id)
    res.status(200).json(deleted)
  } catch (error) {
    console.error('Error al borrar pago:', error);
    res.status(400).json({ error: 'Error al borrar pago' });
  }
}

//  MOSTRAR UN PAGO
const getPaymentHandler = async (req, res) => {
  const { id } = req.params

  try {
    const payment = await getPayment(id)
    res.status(200).json(payment)
  } catch (error) {
    console.error('Error al obtener pago:', error);
    res.status(400).json({ error: 'Error al obtener pago' });
  }
}

// FILTRAR POR DESTINATARIO
const getPaymentRecipientHandler = async (req, res) => {
  const { recipient } = req.params

  try {
    const payment = await getPayRecipientControl(recipient)
    res.status(200).json(payment)
    } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




// FILTRAR POR FECHA
const getPaymentDateHandler = async (req, res) => {
  const { date } = req.params;
  console.log('Fecha desde el manejador:', date);
  try {
    const payment = await getPaymentDateControl(date)
    if(payment.length === 0) {
      throw new Error(`No se encontraron pagos para la fecha: ${date}`)
    }
    // console.log('payment', payment)
    res.status(200).json(payment)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// FILTRAR POR TIPO
const getPaymentTypeHandler = async (req, res) => {
  const { type } = req.params
  try {
    const payment = await getPaymentTypeControl(type)
    res.status(200).json(payment)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
} 

module.exports = { getAllPaymentHandler,createPaymentHandler, putPaymentHandler, deletePaymentHandler, getPaymentHandler, getPaymentRecipientHandler, getPaymentTypeHandler, getPaymentDateHandler}