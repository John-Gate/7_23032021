'use strict';
module.exports = (sequelize, DataTypes) => {//Appel sequelize
  const Comment = sequelize.define('Comment', {
    //Definition des attributs du model
    content: DataTypes.STRING,
    status: DataTypes.INTEGER
  },
    {});
    //Association des commentaires avec le post et l utilisateur correspondant
  Comment.associate = function (models) { 
     models.Comment.belongsTo(models.User, {
       foreignKey: { //application clé étrangère posée sur la table
         allowNull: false
       }
     });
     models.Comment.belongsTo(models.Post, {
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false
      }
    });
  };
  return Comment;
};