const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//const userValidator = require('./admin');

//CREATION COMPTE fct signup qui va crypter password, va cree un nouveau user avec ce password et l email, et l'enregistre
exports.signup = (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          User.create({
              firstName : req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              role: 2
          })
          .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
          .catch(error => res.status(400).json({error}));
      })
      .catch(error => res.status(500).json({error}));
};

//LOGIN
exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
if (username && password) {
    db.query('SELECT * FROM user WHERE username= ?', username, (error, results, _fields) => {
         if (results.length > 0) {
          bcrypt.compare(password, results[0].password).then((valid) => {
            if (!valid) {
              res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
            } else {
              console.log(username, "s'est connecté")
              let status = ''
              if (results[0].isAdmin === 1) {
                status = 'admin'
              } else {
                status = 'membre'
              }
              res.status(200).json({
                userId: results[0].id,
                username: results[0].username,
                status: status,
                token: jwt.sign({ userId: results[0].id, status: status },TOKEN,{ expiresIn: '24h' })
              })
              
            }
          })
        } 
        else {
          res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
        }
      }
    )
  } else {
    res.status(500).json({ message: "Entrez votre email et votre mot de passe" })
  }
};

//profil d'un user
exports.userProfil = (req, res) => {
  let id = utils.getUserId(req.headers.authorization)
  models.User.findOne({
      attributes: ['id', 'email', 'username','isAdmin'],
      where: { id: id }
  })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(500).json(error))
};