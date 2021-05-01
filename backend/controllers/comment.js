const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const utilsjwtoken = require('../utils/jwtoken');
const checkinput = require('../utils/checkinput');
let currentUser ;

exports.createComment = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = req.body.currentUser; 
    const postId = req.body.postId;
    models.User.findOne({
        attributes: ["id"],
        where: {id: userId}
    })
    .then(user => {
            console.log("okk") 
            // On vérifie le retour de la requête sql
            if (null == user) {
                return res.status(400).json({
                    'error': 'Utilisateur non trouvé.',
                    'userId': userId
                })
            }
            else{  
                console.log(req.body)
                models.Post.findOne({
                    attributes: ["id"],
                    where: {id: postId}
                })
                .then(post => {   
                    models.Comment.create({
                        UserId: userId,
                        PostId: postId,
                        content: req.body.comment
                    })
                    .then((newComment) => {
                        return res.status(200).json({
                            'newComment': newComment
                        })
                    })
                    .catch((error) => {
                        return res.status(400).json({
                            'error': error,
                            'user': user
                        })
                    });
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