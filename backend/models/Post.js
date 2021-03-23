const sequelize = require("sequelize");
module.exports = (sequelize, DataTypes)=>{
  const post = sequelize.define("post", {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    img: DataTypes.STRING,
    content:DataTypes.STRING,
    attachement:DataTypes.STRING
  },
  {});
  post.associate=(models)=>{
    models.post.belongsTo(models.user, {
      foreignKey:{
        allowNull:false // rend cle etrangere obligatoire
      }
    })
  }
  return post;
};