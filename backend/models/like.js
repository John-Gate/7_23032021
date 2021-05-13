'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
  
  },
    {});
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