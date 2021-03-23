//password
// module.exports = {
//   isGoodPassword: function (input) {
//       // Au moins 6 caractères, au moins un nombre, une minuscule, une majuscule
//       var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//       return regex.test(input);
//   }
// }

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const fs = require('fs');

const db = require('../models/Db.js');

console.log(Object.keys(db));


exports.getAllUsersAdmin = (req, res, next) => {
    db.User.findAll()
        .then((users) => res.status(200).json({
            users
        }))
        .catch(err => res.status(401).json({
            err
        }))
};
exports.getAllPublicationsAdmin = (req, res, next) => {
    db.Publication.findAll({
            limit: 5,
            include: [{
                model: db.User,
                attributes: ['id', 'username']
            }],
            order: [
                ["id", "DESC"]
            ]
        })
        .then(publications => res.status(200).json({
            publications
        }))
        .catch(error => res.status(500).json({
            error
        }))
}



exports.deleteUser = (req, res, next) => {
    
  //constante pour controler notre userId
  const token = req.headers.authorization.split(' ')[1];// on va recuperer notre token qui est en deuxième élèment du tableau donc 1 et le bearer en 0
  const decodedToken = jwt.verify(token, 'XyJ__L9_VU2qMq8E7r_d__428_JRz9_vv7Uz4wVX_V__5eqE__s6829_tzB');// on va décoder le token, donc on verifie le token et en deuximème argument la clé secrète
  const userId = decodedToken.userId;// on souhaite récuperer l'userId qu'on a encodé 

  db.User.findOne({
      where: {id: userId}
  }).then(user => {
      if(user.isAdmin === true && user.id != req.params.id ){
          db.User.destroy({
              where: { id: req.params.id }
            }).then(() => res.status(200).json({message: 'User supprimée!'}))
              .catch(error => res.status(400).json({error}));
      } else{
          return res.status(403).json('accès non autorisée, si vous êtes l\'admin vous ne pouvez pas supprimez votre compte directement');
      }
      
  }).catch(() => res.status(500).json('problème serveur'));
};


exports.deletePost = (req, res) => {
  const slug = req.params.slug;
  const userID = res.locals.userID; // Vérifier si user est un admin

  let checkOwnerQuery = `SELECT user_id, image_url, post_id, 
  (SELECT role from users where user_id = ? ) AS userRole
  FROM posts WHERE slug = ?`;
  connection.query(checkOwnerQuery, [userID, slug], function(err, result) {
      // Gestion des erreurs
      if (err) return res.status(500).json(err.message);

      // Vérification du propriétaire du post
      if (result[0].user_id != userID && result[0].userRole != 'admin') {
          return res.status(403).json({ error: 'Forbidden : not the owner of the post !' });
      }
      // S'il y a une image, suppression de cette image localement
      if (result[0].image_url != 'defaultPic.png') {
          const filename = result[0].image_url.split('/images/')[1];
          // Suppression de l'image
          fs.unlink(`images/${filename}`, () => {
              // Suppression des votes et du post une fois l'image locale effacée
              let deletePostQuery = 'DELETE FROM posts WHERE slug = ?';
              connection.query(deletePostQuery, [slug], function(err) {
                  if (err) return res.status(500).json(err.message);
                  return res.status(200).json({ message: 'Post deleted !' });
              });
          });
          // S'il n'y a pas d'image à supprimer localement, suppression du post    
      } else {
          let deletePostQuery = 'DELETE FROM posts WHERE slug = ?';
          connection.query(deletePostQuery, [slug], function(err) {
              if (err) return res.status(500).json(err.message);
              return res.status(200).json({ message: 'Post deleted !' });
          });
      }
      if (err) return res.status(500).json(err.message);
  });
};

exports.createPost = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); //on convertit en chaine pour obtenir un objet utilisable
  delete sauceObject._id;//car le frontend genere un id, inutile car on va en avoir un genere par mongodb
  //Creation d une instance de sauce en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé
  const sauce = new Sauce({
    ...sauceObject,

//meme que POSY createPost, a verifier
exports.createMessage = (req, res, next) => {
  const postObject = JSON.parse(req.body.post); //on convertit en chaine pour obtenir un objet utilisable
  delete postObject._id;//car le frontend genere un id, inutile car on va en avoir un genere par mongodb
  //Creation d une instance de post en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes:0,
    dislikes:0,
    usersLiked:[],
    usersDisliked:[]
  });
  sauce.save()//enregistre dans bdd
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};
  post.save()//enregistre dans bdd
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


 exports.deleteMessage = (req, res, next) => {
   Post.findOne({ _id: req.params.id })//on utilise l'ID que nous recevons comme paramètre pour accéder au Post correspondant dans la bdd
     .then(post => {
       const filename = post.imageUrl.split('/images/')[1];
       fs.unlink(`images/${filename}`, () => {//nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ; Unlike va nous permettre de la supprimer
         Post.deleteOne({ _id: req.params.id })//dans ce callback on supprime le Post de la bdd, nous lui passons un objet correspondant au document à supprimer
           .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
           .catch(error => res.status(400).json({ error }));
       });
     })
     .catch(error => res.status(500).json({ error }));
 };


 exports.deleteUser = (req, res, next) => {
   User.findOne({ _id: req.params.id })//on utilise l'ID que nous recevons comme paramètre pour accéder au Post correspondant dans la bdd
     .then(user => {
       const filename = user.imageUrl.split('/images/')[1];
       fs.unlink(`images/${filename}`, () => {//nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ; Unlike va nous permettre de la supprimer
         User.deleteOne({ _id: req.params.id })//dans ce callback on supprime le Post de la bdd, nous lui passons un objet correspondant au document à supprimer
           .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
           .catch(error => res.status(400).json({ error }));
       });
     })
     .catch(error => res.status(500).json({ error }));
};

//a utiliser pour password
// module.exports = {
//   isGoodPassword: function (input) {
//       // Au moins 6 caractères, au moins un nombre, une minuscule, une majuscule
//       var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//       return regex.test(input);
//   }
// }
