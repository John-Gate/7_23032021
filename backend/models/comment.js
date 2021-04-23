'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER
  },
    {});
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