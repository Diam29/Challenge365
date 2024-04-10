const {Payments} = require('../db.js')
const { Sequelize, Op } = require('sequelize');
// const moment = require('moment')

// BUSCAR TODOS LOS PAGOS
const getAllPayments = async (uid) => {
  try {
    const payments = await Payments.findAll(
      {
        where: {
          uid:uid,
        }
      }
    )
    console.log('soy uid', uid)
    return payments
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    throw error
  }
}

// CREAR UN NUEVO PAGO
const createPayment = async ({ recipient, amount, date, description, type, uid}) => {
  try {
    const newPayment = await Payments.create({ recipient, amount, date, description, type, uid })
    console.log('soy newPayment', newPayment)
    return newPayment
  } catch (error) {
    console.error('Error al crear pago: desde controler', error);
    throw error
  }
} 


// BORRAR UN PAGO
const deletePayment = async (uid) => {
  try {
    const deleted = await Payments.destroy({
      where: {
        id: uid
      }
    })
    if (deleted === 0) {
      throw new Error(`No se pudo borrar el pago con id ${uid}`)
    }
    return `Se elimino el pago con id ${uid}`
  } catch (error) {
    console.error('Error al borrar pago:', error);
    throw error
  }
}

// OBTENER UN PAGO
const getPayment = async (id) => {
  try {
    const payment = await Payments.findByPk(id)    
    return payment
  } catch (error) {
    console.error('Error al obtener pago:', error);
    throw error
  }
}

// FILTRAR POR DESTINATARIO

const getPayRecipientControl = async (recipient) => {
  recipient = recipient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  try {
    const payments = await Payments.findAll({
      where: {
        recipient: {
          [Sequelize.Op.iLike]: `%${recipient}%`
        }
      }
    })
    return payments
  } catch (error) {
    console.error(`Error al obtener pagos del destinatario ${recipient}`, error);
    throw error
  }
}


// FILTRAR POR FECHA
const getPaymentDateControl = async (date) => {
  console.log('date desde controler', date);
  try {
    const [year, month, day] = date.split('-').map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59);
    const payments = await Payments.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    return payments;
  } catch (error) {
    console.error('Error al obtener pagos por fecha:', error);
    throw error;
  }
};


// FILTRAR POR TIPO
const getPaymentTypeControl = async (type) => {
  try {
  
  const payments = await Payments.findAll()
  
    const filteredPayments = payments.filter(payment => 
      payment.type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    )
    return filteredPayments
  } catch (error) {
    console.error('Error al obtener pagos por tipo:', error);
    throw error
  }
}

module.exports = { getAllPayments, createPayment, deletePayment, getPayment, getPayRecipientControl, getPaymentTypeControl, getPaymentDateControl}
