const { Timestamp } = require('firebase/firestore');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pacientes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pago: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipoPago: {
      type: DataTypes.ENUM('transferencia', 'tarjeta de crédito', 'débito automático'),
      allowNull: false
    },
    psicologo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Psicologos',
        key: 'uid'
      }
    }
  },
    {
      timestamps: false
    }
  );

};
