const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const utilsjwtoken = require('../utils/jwtoken');
const checkinput = require('../utils/checkinput');
let currentUser ;

//Fonction de creation d'un commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = req.body.currentUser; 
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
            }
            else{ 
                models.Post.findOne({
                    attributes: ["id"],
                    where: {id: postId}
                })
                .then(() => {
                if (user.role == 2) {
                    models.Comment
                    .create({
                        UserId: decodedToken.userId,
                        content: req.body.comment,
                        PostId: postId,
                        status: 1
                    })
                    .then((newComment) => {
                        return res.status(200).json({
                            'user': user,
                            'status': 1,
                            'newComment': newComment
                        })
                    })
                    .catch((error) => {
                        return res.status(400).json({
                            'error': error,
                            'user': user
                        })
                    }); 
              }
              else{
                models.Comment.create({
                    UserId: decodedToken.userId,
                    PostId: postId,
                    content: req.body.comment
                })
                .then((newComment) => {
                    return res.status(200).json({
                        'user': user,
                        'status': 0,
                        'newComment': newComment
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        'error': error,
                        'user': user
                    })
                });
              }});
            }
        })
        .catch(error => {
            return res.status(500).json({
                'error': error,
                'userId': userId
            })
        });
  };