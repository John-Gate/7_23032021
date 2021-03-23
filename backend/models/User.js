'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName : DataTypes.STRING,
    lastName : DataTypes.STRING,
    role: DataTypes.INTEGER
  },
  {});
  return User;
};