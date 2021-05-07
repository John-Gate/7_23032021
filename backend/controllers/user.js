const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const utilsjwtoken = require('../utils/jwtoken');
const checkinput = require('../utils/checkinput');


//CREATION COMPTE fct signup qui va crypter password, va cree un nouveau user avec ce password et l email, et l'enregistre
exports.signup = (req, res) => {
    let email = req.body.email;
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let password = req.body.password;
    if (email == null || lastName == null || firstName == null || password == null) {
        res.status(400).json({ error: 'Tous les champs sont obligatoires' })
    }
    //vérification inputs user
    let emailOK = checkinput.validEmail(email);
    let passwordOK = checkinput.validPassword(password);
    let lastNameOK = checkinput.validUsername(lastName);
    let firstNameOK = checkinput.validUsername(firstName);
    if (emailOK == true && passwordOK == true && lastNameOK == true && firstNameOK == true) {
        //vérification si user n'existe pas déjà
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (error, hash) {
                        //création user
                        const newUser = models.User.create({
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
                }
                else {
                    res.status(400).json({ error: 'Cet utilisateur existe déjà' })
                }
            })
            .catch(error => { res.status(501).json({ error }) })
    } else {
        console.log('Erreu1r')
    }
};

exports.login = (req, res) => {
    //récupération et validation des paramètres
    let email = req.body.email;
    let password = req.body.password;
    if (email == null || password == null) {
        res.status(400).json({ error: 'Il manque une information' })
    }
    //user existe-t-il?
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


exports.getUser = (req, res, next) => {
    const idUser = req.params.id 
    models.User.findOne ({
        attributes: ["email", "firstName", "lastName", "Role", "createdAt", "id"],
        where: {id: idUser}
    })
    .then((user) => {
        if(user == null){
          return res.status(400).json("Utilisateur non trouvé")
        }
        else{
            return res.status(200).json(user)
    }
      })
      
  .catch(error=>res.status(500).json(error))
};

exports.deleteUser = (req, res, next) => {
    //  const token = req.headers.authorization.split(' ')[1];
    //  const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
     const userId = req.body.currentUser;
        models.User.findOne({
             attributes: ["id"],
             where: {id: userId}
         })
         .then(user => {
              //On vérifie le retour de la requête sql
            if (null == user) {
                
                 return res.status(400).json("Suppression de l'utilisateur non-authorisée")
             }
             else{  
                models.Post.destroy({
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


   exports.likeSauce = (req, res, next) =>{
    if(req.body.like ==1){//si user a like
      Sauce.updateOne({_id: req.params.id}, {$inc:{likes:1}, $push:{usersLiked:req.body.userId },_id:req.params.id } )//c est l id qu on va modifie
      .then(sauces=> res.status(200).json(sauces))
      .catch(error => res.status(400).json({error}));
    }else if(req.body.like ==-1){//si user a dislike
      Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:1}, $push:{usersDisliked:req.body.userId },_id:req.params.id } )
      .then(sauces=> res.status(200).json(sauces))
      .catch(error => res.status(400).json({error}));
    }else if(req.body.like ==0){
      Sauce.findOne({_id: req.params.id})
      .then(sauces=> {
        if(sauces.usersLiked.find(user=> user===req.body.userId)){//si il avait like
          Sauce.updateOne({_id: req.params.id}, {$inc:{likes:-1}, $pull:{usersLiked:req.body.userId },_id:req.params.id } )
          .then(sauces=> res.status(200).json(sauces))
          .catch(error => res.status(400).json({error}));
        }
        if(sauces.usersDisliked.find(user=> user===req.body.userId)){//si il avait dislike
          Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:-1}, $pull:{usersDisliked:req.body.userId },_id:req.params.id } )
          .then(sauces=> res.status(200).json(sauces))
          .catch(error => res.status(400).json({error}));
        }
      })
      .catch(error=>console.log(error));
    }
  }