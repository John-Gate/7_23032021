const jwt = require('jsonwebtoken');
const models = require('../models');
let currentUser ;

////Creation d'un article
exports.createPublication = (req, res, next) => {
    let imageName
    const token = req.headers.authorization.split(' ')[1];
    const userId = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
        models.User.findOne({
            attributes: ["id", "role"],
            where: {id: decodedToken.userId}
        })
        .then(user => {
            // On vérifie le retour de la requête sql
            if (null == user) {
                return res.status(400).json({
                    'error': 'Utilisateur non trouvé.',
                    'userId': userId
                })
            } else{  
                if(typeof data == 'object'){
                    this.posts = data;
                }
                if (user.role == 2) {
                    if(req.file){
                        imageName =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    } else{
                        imageName = null;
                    }
                    models.Post.create({
                        UserId: decodedToken.userId,
                        title: req.body.title,
                        content: req.body.content,
                        image: imageName,
                        status: 1
                    })
                    .then((newPost) => {
                            return res.status(200).json({
                                'user': user,
                                'status': 1,
                                'newPost': newPost
                            })
                        })
                        .catch((error) => {
                            return res.status(400).json({
                                'error': error,
                                'user': user
                            })
                        }); 
                        
                  } else{
                    if(req.file){
                        imageName =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    } else{
                        imageName = null;
                    }
                    models.Post.create({
                        UserId: decodedToken.userId,
                        title: req.body.title,
                        content: req.body.content,
                        image: imageName
                    })
                    .then((newPost) => {
                        return res.status(200).json({
                            'user': user,
                            'status': 0,
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
            }
        })
        .catch(error => {
            return res.status(500).json({
                'error': error,
                'userId': userId
            })
        });
};

////Afficher un article seulement
exports.getOnePublication = (req, res, next) => {
    const idPost = req.params.id 
    models.Post.findOne ({
        include:[{ //identifier le createur de l'article
            model:models.User,
            attributes: ["firstName", "lastName"]
        }],
        attributes: ["id", "content", "title", "updatedAt", "createdAt", "UserId", "image","User.firstName"],
        where: {id: idPost, status:1}
    })
    .then((post) => {
        if(post == null){
            return res.status(400).json("Article inconnu")
        } else{//affiche commentaire lie a l article
            models.Comment.findAll({
                include:[{ //identifier le post
                    model:models.User,
                    attributes: ["firstName"]
                }],
                attributes: ["id", "content", "createdAt","UserId"],
                order:[["createdAt", "DESC"]],//on voit le plus recent d abord pour admin il fadrau n ehere ou status = 0 car ils sont a moderer
                where: {PostId: idPost, status: 1}
                })
            .then((comments) => {
                models.Like.findAll({
                    attributes: ["UserId"],
                    where: {PostId: idPost}
                    })
                    .then((like) => {
                        let objectToSend 
                        if(comments.length !== null && like.length !== null){
                            objectToSend = {
                            "post": post,
                            "comment": comments,
                            "like" : like
                            }
                        } else if(comments.length != null && like.length == null){
                            objectToSend = {
                            "post": post,
                            "comment": comments
                            }
                        } else if(comments.length == null && like.length != null){
                            objectToSend = {
                            "post": post,
                            "like" :like
                            }
                        } else{
                            objectToSend = {
                                "post": post
                            }
                        } 
                        return res.status(200).json(objectToSend)
                    })
            .catch(error=>res.status(500).json(error))
            })
            .catch(error=>res.status(500).json(error));
        }
    })
    .catch(error=>res.status(500).json(error))
};

////Afficher tous les articles
 exports.getAllPublications = (req, res, next) => {
    models.Post.findAll({
      include:[{ //identifier le post
          model:models.User,
          attributes: ["firstName", "lastName"]
      }],
      where:{status:1},  
      order:[["updatedAt", "DESC"]]//on voit le plus recent d abord 
    })
    .then((posts) => {
        if(posts.length > null){
          return res.status(200).json(posts)
        } else{
             return res.status(400).json("Aucun article")
  }})
  .catch(error=>res.status(500).json(error))
 };

////Permet a l'auteur de l'article de le supprimer
exports.deletePublication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId
    models.User.findOne({
            attributes: ["id"],
            where: {id: userId}
        })
        .then(user => {
            //On vérifie le retour de la requête sql
        if (null == user) {
                return res.status(400).json("Suppression du message non-authorisée")
            } else{    
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
  
////Permet a l'auteur de l'article de le modifier
exports.updatePublication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const postId = req.body.postId;
    currentUser = decodedToken.userId;
            models.User.findOne({
                attributes: ["id","role"],
                where: {id: currentUser}
            })
        .then(user => {
            if (null == user) {
                return res.status(400).json("UTILISATEUR INCONNU")
            } else{   
                models.Post.findOne({
                    attributes: ["UserId", "image"],
                    where: {id: postId}
                })
                .then(post=>{
                    if(post.UserId == currentUser){ //Verifiaction Utilisateur = Auteur
                        if (user.role == 2) {   
                        if(req.file){
                            var data={
                                title: req.body.title,
                                content: req.body.content,
                                image : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                                status: 1
                            }
                        } else {
                            var data={
                                title: req.body.title,
                                content: req.body.content,
                                status: 1
                            }
                        }
                        models.Post.update(
                           data,                        
                           {where: {id: postId}}
                        )
                        .then(()=>res.end())
                        .catch(()=>res.status(500).json("Modification Impossible"))
                        }else{
                        if(req.file){
                            var data={
                                title: req.body.title,
                                content: req.body.content,
                                image : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                                status: 0
                            }
                        } else {
                            var data={
                                title: req.body.title,
                                content: req.body.content,
                                status: 0
                            }
                        }
                        models.Post.update(
                           data,                        
                           {where: {id: postId}}
                        )
                        .then(()=>res.end())
                        .catch(()=>res.status(500).json("Modification Impossible"))
                        }
                    } else{
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