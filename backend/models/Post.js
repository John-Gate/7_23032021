'use strict';
module.exports = (sequelize, DataTypes) => {//Appel sequelize
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
  },
    {});
    //Association de l'article a son utilisateur
  Post.associate = function (models) {
     models.Post.belongsTo(models.User, {
       foreignKey: { //application clé étrangère posée sur la table
         allowNull: false
       }
     });
  };
  return Post;
};


