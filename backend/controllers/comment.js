////Creation d'un commentaire
// Les commentaires peuvent avoir comme status : 
// 0 : il a été créé mais n'est pas encore modéré.
// 1 : il est modéré, et va donc s'afficher 
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId;
    const postId = req.body.postId;
    models.User.findOne({
        attributes: ["id", "role"],
        where: {id: userId}
    })
    .then(user => {
            //Vérification de retour de la requête sql
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
            } else{
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
            }}
        );
        }
    })
        .catch(error => {
            return res.status(500).json({
                'error': error,
                'userId': userId
            })
        });
};