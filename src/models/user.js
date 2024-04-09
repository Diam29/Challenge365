const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
sequelize.define('User', {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photoURL: {
      type: DataTypes.STRING,
    },
  }
  );
};

