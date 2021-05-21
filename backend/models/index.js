////Connexion sequelize à la base de données
'use strict';
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

let sequelize;
//Creation d une instance sequelize en passant les parametres de conexion separement
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, //localHost
  dialect: 'mysql' 
});

//Connexion à la database
sequelize.authenticate()
  .then(() => console.log('La connexion est établie.'))
  .catch((error) => console.log('La connexion a échoué', error));

fs//FileSystem
  .readdirSync(__dirname) //Récupère tous les fichiers du répertoire du script en cours d'exécution de manière synchrone
  .filter(file => { //Filtre les fichiers qui commencent avec " . " different de basename et retire le " .js " a la fin.
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }) //Itere et import fichiers dans Base de donnees
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
//Itère sur chaque modèle de la base de données (tâche et utilisateur) et invoque sa fonction associée (s'il en a une), vraisemblablement pour configurer les associations entre les modèles, les clés étrangères, les cascades, etc.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
