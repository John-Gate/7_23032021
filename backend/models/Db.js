const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const path = require('path');
const fs = require('fs'); //
const basename = path.basename(__filename);
const sequelize = require("sequelize");
// const path = require('path');
// const baseName = path.baseName(__filename);
const db = {};

let connect ;
connect = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,

  dialect: 'mysql' //process.env.DB_DIALECT 
});
console.log(connect)
connect.authenticate()
  .then(()=>console.log("Connexion etablie"))
  .catch((error)=>console.log("Connexion echouée", error));
Object.keys(db).forEach(modelName=>{
  if(db[modelName].associate){
    db[modelName].associate(db)
  }
});  
db.connect = connect;
db.sequelize = Sequelize;
module.exports = db;

fs
  .readdirSync(__dirname)
  .filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
});