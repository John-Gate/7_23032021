const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const utilsjwtoken = require('../utils/jwtoken');
const checkinput = require('../utils/checkinput');
let currentUser ;

exports.createPublication = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    const userId = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(userId, process.env.KEY_TOKEN);
        models.User.findOne({
            attributes: ["id"],
            where: {id: decodedToken.userId}
        })
        .then(user => {
            // On vérifie le retour de la requête sql
            if (null == user) {
                return res.status(400).json({
                    'error': 'Utilisateur non trouvé.',
                    'userId': userId
                })
            }
            else{          
                models.Post.create({
                    UserId: decodedToken.userId,
                    title: req.body.title,
                    content: req.body.content
                })
                .then((newPost) => {
                    return res.status(200).json({
                        'user': user,
                        'newPost': newPost
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        'error': error,
                        'user': user
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
  
  exports.getOnePublication = (req, res, next) => {
      const idPost = req.params.id 
      models.Post.findOne ({
        attributes: ["id", "content", "title", "updatedAt", "createdAt", "UserId"],
        where: {id: idPost, status:1}
      })
      .then((post) => {
          if(post == null){
            return res.status(400).json("Article inconnu")
          }
          else{//affiche commentaire lie a l article
            models.Comment.findAll({
                attributes: ["id", "content", "createdAt"],
                order:[["createdAt", "DESC"]],//on voit le plus recent d abord pour admin il fadrau n ehere ou status = 0 car ils sont a moderer
                where: {PostId: idPost, status: 1}
              })
              .then((comments) => {
                  if(comments.length !== null){
                    const objectToSend = {
                        "post": post,
                        "comment": comments
                    }
                    return res.status(200).json(objectToSend)
                  }
                  else{
                    return res.status(200).json(post)
            }})
            .catch(error=>res.status(501).json(error))
    }})
    .catch(error=>res.status(500).json(error))
  };

 exports.getAllPublications = (req, res, next) => {
    models.Post.findAll({
      include:[{ //identifier le post
          model:models.User, attributes: ["firstName", "lastName"]
      }],
      where:{status:1},  
      order:[["createdAt", "DESC"]]//on voit le plus recent d abord pour admin il fadrau n ehere ou status = 0 car ils sont a moderer
    })
    .then((posts) => {
        if(posts.length > null){
          return res.status(200).json(posts)
        }
        else{
      return res.status(400).json("Aucun article")
  }})
  .catch(error=>res.status(500).json(error))
 };

   exports.deletePublication = (req, res, next) => {
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
                 return res.status(400).json("Suppression du message non-authorisée")
             }
             else{    
                 models.Post.findOne({
                     where: {id:req.body.postId}
                 })
                 .then((post) => {
                     models.Post.destroy({
                         where: {id:post.id}
                     })
                     .then(()=>res.status(200).json("Article Supprimé"))
                     .catch(error=>res.status(500).json("Suppression Impossible"))
                     })
                    .catch((error) =>res.status(500).json("Article Introuvable")
                 );
             }
         })
         .catch(error => {
             return res.status(500).json("Utilisateur Introuvable")
         });
   };
  

   exports.updatePublication = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const postId = req.body.postId;
    currentUser = req.body.currentUser;
        models.User.findOne({
            attributes: ["id"],
            where: {id: currentUser}
        })
        .then(user => {
            if (null == user) {
                return res.status(400).json("UTILISATEUR INCONNU")
            }
            else{   
                models.Post.findOne({
                    attributes: ["UserId"],
                    where: {id: postId}
                })
                .then(post=>{
                    if(post.UserId == currentUser){ // on verifie que bien l auteur
                        models.Post.update({
                            title: req.body.title,
                            content: req.body.content
                        },
                        {where: {id: postId}}
                        )
                        .then(()=>res.end())
                        .catch(error=>res.status(500).json("Modification Impossible"))
                    }
                    else{
                        return res.status(500).json("L'utilisateur n a pas les droits")
                    }
                })   
             }
        })
        .catch(error => {
            return res.status(500).json({
                'error': error,
                'userId': userId
            })
        });
  };