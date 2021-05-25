//mdp Y7S])5@A"gG?4/Cq  ou  YbTjVleEtYxufvw6
//importation
const express = require('express'); //
const bodyParser = require('body-parser');//
const helmet = require('helmet');//wasp
const path = require('path');//


require('dotenv').config();

//routage 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const adminRoutes = require('./routes/admin');
const commentRoutes = require('./routes/comment');
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
app.use('/post', postRoutes);
app.use('/admin', adminRoutes);
app.use('/comment', commentRoutes);

//envoit
module.exports = app;


