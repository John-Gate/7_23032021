'use strict';
module.exports = (sequelize, DataTypes) => {//Appel sequelize
  const Like = sequelize.define('Like', {
  },
    {});
    //Association des Likes avec l'article et l'utilisateur correspondant
  Like.associate = function (models) { 
     models.Like.belongsTo(models.User, {
       foreignKey: { //application clé étrangère posée sur la table
         allowNull: false
       }
     });
     models.Like.belongsTo(models.Post, {
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false
      }
    });
  };
  return Like;
};