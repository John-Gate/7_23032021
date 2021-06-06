// Fonction concernant le Login, Signup, Acces aux infos d un utilisateur, 
// suppression d un utilisateur et Like d'une publication.

// Le role d'un utilisateur est : 
// 0 : s'il a créé un compte mais n'est pas encore modéré.
// 1 : s'il est modéré, et peut donc avoir accés aux fonctionnalités de base
// (Creer un Article, un Commentaire, liker, modifier/supprimer sa publication ou
// supprimer son compte)
// 2 : s'il est Administrateur. Il pourra modérer les publicaitons,
// et avoir accés aux statistiques de l'applicaiton. Aussi , l'administateur n'a pas 
// à moderer ses propres publications. 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const utilsjwtoken = require('../utils/jwtoken');
const checkinput = require('../utils/checkinput');
const fs = require("fs");

////Creation d un compte en cryptant password, creer un nouvel utilisateur et enregistre données.
exports.signup = (req, res) => {
    let email = req.body.email;
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let password = req.body.password;
    if (email == null || lastName == null || firstName == null || password == null) {
        res.status(400).json({ error: 'Tous les champs sont obligatoires' })
    }
    //Vérification inputs user par path => utils/checkinputs.js
    let emailOK = checkinput.validEmail(email);
    let passwordOK = checkinput.validPassword(password);
    let lastNameOK = checkinput.validUsername(lastName);
    let firstNameOK = checkinput.validUsername(firstName);
        if (emailOK == true && passwordOK == true && lastNameOK == true && firstNameOK == true) {
            //Vérification si utilisateur n'existe pas déjà
            models.User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (error, hash) {
                        //Création user
                        models.User.create({
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            password: hash
                        })
                            .then(userNew => { res.status(201).json({ 'Utilisateur créé ! Id': userNew.idUser }) })
                            .catch(err => {
                                res.status(500).json({ error })
                            })
                    })
                } else {
                    res.status(400).json({ error: 'Cet utilisateur existe déjà' })
                }
            })
            .catch(error => { res.status(501).json({ error }) })
        } else {
            console.log('Erreur')
        }
};

////Connexion à son Compte par l'utilisateur
exports.login = (req, res) => {
    //Récupération et validation des paramètres
    let email = req.body.email;
    let password = req.body.password;
        if (email == null || password == null) {
            res.status(400).json({ error: 'Il manque une information' })
        }
        //Utilisteur existe-t-il?
        models.User.findOne({
            where: { email: email }
        })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                         res.status(200).json({
                             userId: user.id,
                             token: utilsjwtoken.generateToken(user),
                             name: user.firstName
                         })
                    } else {
                        res.status(403).json({ error: 'invalid password' });
                    };
                })
            } else {
                res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
            }
        })
        .catch(err => { res.status(500).json({ err }) })
};

////Acquisition du profil de l'utilisateur 
exports.getUser = (req, res, next) => {
    const idUser = req.params.id 
    models.User.findOne ({
        attributes: ["email", "firstName", "lastName", "Role", "createdAt", "id"],
        where: {id: idUser}
    })
    .then((user) => {
        if(user == null){
          return res.status(400).json("Utilisateur non trouvé")
        } else{
            return res.status(200).json(user)
    }
      })
      
  .catch(error=>res.status(500).json(error))
};

////Suppression du profil de l'utilisateur
exports.deleteUser = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1];
     const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
     const userId = decodedToken.userId;
        models.User.findOne({
             attributes: ["id"],
             where: {id: userId}
         })
         .then(user => {
              //On vérifie le retour de la requête sql
            if (null == user) {
                 return res.status(400).json("Suppression de l'utilisateur non-authorisée")
             } else{  
                // models.Post.findAll({
                //     where:{image: !null} 
                //   })
                //     .then((post) => {     
                //     filename = post.image.split('/images/')[1] 
                //         fs.unlink(`images/${filename}`, () => {
                //           post.destroy({ _id: req.params.id })
                //             .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                //             .catch(error => res.status(400).json({ error }));
                //         });
                //     })
                //     .catch((error) =>res.status(500).json("Article Introuvable")
                // );  
                models.Post.destroy({
                    where: { userId: user.id }
                })
                models.Like.destroy({
                    where: { userId: user.id }
                })
                .then(() => {
                    models.User.destroy({
                        where: {id:userId}
                    })
                    .then(()=>res.status(200).json("Utilisteur Supprimé"))
                    .catch(error=>res.status(500).json("Suppression Impossible"))
                })
             }
         })
         .catch(error => {
             return res.status(500).json("Utilisateur Introuvable")
         });
   };

////Aimer un article
exports.likePost = (req, res, next) => {
const token = req.headers.authorization.split(' ')[1];
const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
const userId = decodedToken.userId;
const postId = req.body.postId;
    models.User.findOne({
        attributes: ["id", "role"],
        where: {id: userId}
    })
    .then(user => {
            // On vérifie le retour de la requête sql
            if (null == user) {
                return res.status(400).json({
                    'error': 'Utilisateur non trouvé.',
                    'userId': userId
                })
            } else{ 
                models.Post.findOne({
                    attributes: ["id"],
                    where: {id: postId}
                })
                .then(() => {
                    models.Like.findOne({
                        attributes: ["id"],
                        where: {UserId: userId, PostId: postId}
                    })
                    .then((user) =>{
                        models.Like.destroy({
                            where: {id: user.id}
                        })
                        .then(()=>res.status(200).json({
                            'newLike': null
                        }))
                        .catch(()=>res.status(500).json("Suppression Impossible"))
                    })
                    .catch(()=>{
                if (user.role > 0) {
                    models.Like
                    .create({
                        UserId: userId,
                        PostId: postId
                    })
                    .then((newLike) => {
                        return res.status(200).json({
                            'newLike': newLike
                        })
                    })
                    .catch((error) => {
                        return res.status(401).json({
                            'error': error
                        })
                    }); 
                }
                })
                });
            }
        })
        .catch(error => {
            return res.status(500).json({
                'error': error,
                'userId': userId
            })
        });
};