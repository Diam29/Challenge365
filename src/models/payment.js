const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
sequelize.define('Payments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const date = this.getDataValue('date');
        return date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : null;
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('transferencia', 'tarjeta de crédito', 'débito automático'),
      allowNull: false
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
