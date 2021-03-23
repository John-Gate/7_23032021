//mdp Y7S])5@A"gG?4/Cq  ou  YbTjVleEtYxufvw6
//importation
const express = require('express'); //
const bodyParser = require('body-parser');//
const helmet = require('helmet');//
const path = require('path');//

require('dotenv').config();

//routage 
const userRoutes = require('./routes/user');

const app = express();


//Acces a l'API 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //depuis n'importe quelle origine ( '*' ) 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//envoyer des requêtes avec les méthodes mentionnées ( GET, POST, PUT, DELETE, PATCH, OPTIONS)
  next();
});

// Utilisation du body-parser pour application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// protection
//contre injection sql et xss
app.use(helmet()); 

// Utilisation du path 
app.use('/images', express.static(path.join(__dirname, 'images')));//indique a express qu il faut gerer la ressource de maniere statiqueun sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/api/auth', userRoutes);


//envoit
module.exports = app;



// //mdp Y7S])5@A"gG?4/Cq  ou  YbTjVleEtYxufvw6
// //importation
// const express = require('express'); //
// const bodyParser = require('body-parser');//
// const helmet = require('helmet');//
// const xss = require ('xss-clean');//
// const path = require('path');//
// const app = express();
// require('dotenv').config();

// //routage
// const postRoutes = require('./routes/post');  
// const userRoutes = require('./routes/user');
// const adminRoutes = require('./routes/admin');

// //Connexion server
// const mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : '',//si changer le password voir plus haut
//   database : 'dbgroupomania'//Donner un nom a la bdd de php myadmion
// });
// connection.connect();
// connection.query('SELECT 1 + 3 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// connection.end();

// //Acces a l'API 
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); //depuis n'importe quelle origine ( '*' ) 
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) 
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//envoyer des requêtes avec les méthodes mentionnées ( GET, POST, PUT, DELETE, PATCH, OPTIONS)
//   next();
// });

// // Utilisation du body-parser pour application/json
// app.use(bodyParser.json());

// // Utilisation du path 
// app.use('/images', express.static(path.join(__dirname, 'images')));//indique a express qu il faut gerer la ressource de maniere statiqueun sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images
// app.use('/api/auth', userRoutes);
// app.use('/api/publications', postRoutes);
// app.use('/api/admin', adminRoutes); 


// // protection
// //contre injection sql et xss
// app.use(helmet()); 
// //This header prevents Internet Explorer from executing downloaded files in the site's context. This is achieved with noopen directive.
// app.use(helmet.ieNoOpen());
// //This setting denies all such <iframe> content.Clickjacking is an ingenious technique for hiding an invisible <iframe> containing malicious code, but positioned on top of a thing that looks enticing to click on. The user would then be enticed into clicking on the malicious button.
// app.use(helmet.frameguard({ action: 'deny' }));
// //Nettoye les entrees user
// app.use(xss());
// //ne retourne que ce qui est demande dans un champ(si besoin que du nom ne retournera pas email etc..)
// exports.sanitizeUser = function(user) {
// return {
//   id: user.id,
//   username: user.username,
//   fullName: user.fullName
//   };
// };

// //envoit
// module.exports = app;


