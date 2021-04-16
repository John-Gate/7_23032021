const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const utilsjwtoken = require('../utils/jwtoken');
const checkinput = require('../utils/checkinput');

exports.createPublication = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = 1; 
        models.User.findOne({
            attributes: ["id"],
            where: {id: userId}
        })
        .then(user => {
            // On vérifie le retour de la requête sql
            if (null == user) {
                console.log("step1")
                return res.status(400).json({
                    'error': 'Utilisateur non trouvé.',
                    'userId': userId
                })
            }
            else{  
                console.log("step3")         
                models.Post.create({
                    UserId: userId,
                    title: req.body.title,
                    content: req.body.content
                })
                .then((newPost) => {
                    console.log("step4")
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
            console.log("step2")
            return res.status(500).json({
                'error': error,
                'userId': userId
            })
        });
  };
  
  exports.getOnePublication = (req, res, next) => {
      console.log("step1" + " " + req.params)
      const idPost = req.params.id 
      models.Post.findOne ({
        attributes: ["id", "content", "title", "updatedAt", "createdAt"],
        where: {id: idPost}
      })
      .then((post) => {
          if(post == null){
            return res.status(400).json("article inconnu")
          }
          else{
        return res.status(200).json(post)
    }})
  };

 exports.getAllPublications = (req, res, next) => { 
    console.log("step2")
    models.Post.findAll({
      include:[{ //identifier le post
          model:models.User, attributes: ["firstName", "lastName"]
      }],  
      order:[["createdAt", "DESC"]]
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
     const userId = 1;
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
                     .then(()=>res.end())
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
    const userId = 1;
        models.User.findOne({
            attributes: ["id"],
            where: {id: userId}
        })
        .then(user => {
           
            // On vérifie le retour de la requête sql
            if (null == user) {
                return res.status(400).json({
                    'error': 'Commentaire non trouvé.',
                    'userId': userId
                })
            }
            else{      
                models.Post.updateOne({
                    id:1
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