'use strict';
module.exports = (sequelize, DataTypes) => { //Appel sequelize
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName : DataTypes.STRING,
    lastName : DataTypes.STRING,
    role: DataTypes.INTEGER
  },
  {});
  //Association de l'utilisateur a son/ses articles
   User.associate = function(models) {
     models.User.hasMany(models.Post) 
   };
  return User;
};