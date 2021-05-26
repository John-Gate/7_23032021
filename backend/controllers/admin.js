const jwt = require('jsonwebtoken');
const models = require('../models');;
let currentUser ;

////Permet de valider, et donc de publier, les articles 
exports.postModeration = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
  const postId = req.params.id;
  currentUser = decodedToken.userId;
    models.User.findOne({
        attributes: ["role"],
        where: {id: currentUser}
      })
    .then(user => {
        if (user.role == 2) {
            models.Post.update({
            status: 1 // authorise l article a etre visible 
        },
        {where: {id: postId}}
        )
        .then(()=>res.status(200).json("Article valide par administrateur"))
        .catch(error=>res.status(500).json("Modification Impossible"))   
      } else{
      return res.status(400).json("Droits reservés aux administrateurs")
      }
    })
    .catch(error => {
        return res.status(500).json({'error': error})
    });
};

////Permet de valider et donc de publier les utilisateurs 
exports.userModeration = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
  const UserId = req.params.id;
  currentUser = decodedToken.userId;
    models.User.findOne({
        attributes: ["role"],
        where: {id: currentUser}
    })
    .then(user => {
      if (user.role == 2) {
        models.User.update({
          role: 1 // authorise l user a etre visible 
        },
        {where: {id: UserId}}
        )
        .catch(error=>res.status(500).json("Modification Impossible"))   
        .then(()=>res.status(200).json("Utilisateur validé par administrateur"))
      } else{
      return res.status(400).json("Droits reservés aux administrateurs")
      }
    })
    .catch(error => {
        return res.status(500).json({'error': error,'userId': userId})
    });
};

////Permet de valider et donc de publier les commentaires 
exports.commentModeration = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
  const commentId = req.params.id
  currentUser = decodedToken.userId;
    models.User.findOne({
        attributes: ["role"],
        where: {id: currentUser}
    })
    .then(user => {
        if (user.role == 2) {
            models.Comment.update({
            status: 1 // authorise le commentaire a etre visible 
        },
        {where: {id: commentId}}
        )
        .catch(error=>res.status(500).json("Modification Impossible"))   
        .then(()=>res.status(200).json("Commentaire validé par administrateur"))
        } else{
          return res.status(400).json("Droits reservés aux administrateurs")
        }
    })
    .catch(error => {
        return res.status(500).json({
            'error': error,
            'userId': userId
        })
    });
};

////Afficher tous les nouveaux articles pour pouvoir les moderer par la suite
exports.getAllPublications = (req, res, next) => { 
  models.Post.findAll({
    include:[{ //identifier le post
        model:models.User,
        attributes: ["firstName", "lastName"]
    }],
    where:{status:0},  
    order:[["createdAt", "DESC"]]//le plus recent d abord
  })
  .then((posts) => {
      if(posts.length > null){
        return res.status(200).json(posts)
      } else if(posts.length == 0){
        return res.status(200).json("Aucun article")
      } else{
        return res.status(400).json("Aucun article")
      }
  })
  .catch(error=>res.status(500).json(error))
};

////Afficher tous les nouveaux utilsateurs pour pouvoir les moderer par la suite
exports.getAllUsers = (req, res, next) => { 
    models.User.findAll({
      where:{role:0},  
      order:[["createdAt", "DESC"]]//le plus recent d abord 
    })
    .then((users) => {
        if(users.length > null){
          return res.status(200).json(users)
        } else if(users.length == 0){
          return res.status(200).json("Pas de Nouvel Utilisateur")
        } else{
          return res.status(400).json("Pas de Nouvel Utilisateur")
        }
    })
    .catch(error=>res.status(500).json(error))
  };

////Afficher tous les nouveaux commentaires pour pouvoir les moderer par la suite
  exports.getAllComments = (req, res, next) => { 
    models.Comment.findAll({
      include:[{ //identifier le post
          model:models.User, attributes: ["firstName", "lastName"],
          model:models.Post, attributes: ["title", "content"]
      }],
      where:{status:0},  
      order:[["createdAt", "DESC"]]//on voit le plus recent d abord pour admin il fadrau n ehere ou status = 0 car ils sont a moderer
    })
    .then((comments) => {
        if(comments.length > null){
          return res.status(200).json(comments)
        } else if(comments.length == 0){
          return res.status(200).json("Pas de Nouveau Commentaire")
        } else{
          return res.status(400).json("Pas de Nouveau Commentaire")
        }
    })
    .catch(error=>res.status(500).json(error))
  };

////Connaitre les statistiques pour moderateur du nombre d utilisateur, articles et commentaires
  exports.statistics = (req, res, next) => {
    models.User.findAll({
        order:[["createdAt", "DESC"]]
      })
    .then((users) => {
        if(users.length > null){
          models.Post.findAll({
              order:[["createdAt", "DESC"]]
            })
            .then((posts) => {
                if(posts.length > null){
                  models.Comment.findAll({
                      order:[["createdAt", "DESC"]]
                    })
                    .then((comments) => {
                        if(comments.length > null){
                          const combine = {
                              "post": posts,
                              "comment": comments,
                              "user":users
                          }
                          return res.status(200).json(combine)
                        } else{
                            return res.status(400).json("Pas de Nouveau Commentaire")
                        }
                    })
                  .catch(error=>res.status(500).json(error))
                } else{
                    return res.status(400).json("Pas de nouveau Post")
                }
            })
          .catch(error=>res.status(500).json(error))
        } else{   
            return res.status(400).json("Pas de nouveau Utilisateur")
        }
    })
    .catch(error=>res.status(500).json(error))
  };