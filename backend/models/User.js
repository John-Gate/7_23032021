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
   User.associate = function(models) {
     models.User.hasMany(models.Post) //association des users et des posts
   };
  return User;
};