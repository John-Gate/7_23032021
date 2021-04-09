exports.createPost = (req, res, next) => {

  db.post.create({
      user_id: req.body.user_id,
      content: req.body.content,
      title: req.body.title,
  })
      .then((postCreated) => res.status(201).json({ message: 'Sujet créé !', post: postCreated }))
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  var condition = postId ?
      { id: { [db.Sequelize.Op.eq]: postId } } : null;
  Post.destroy({ where: condition })
      .then(data => {
          let message = 'Post supprimé avec succès';
          let statut = 200;
          if (data === 0) {
              message = 'Post inexistant';
              statut = 404;
          }
          res.status(statut).json({ message: message });
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Cet ID est inconnu."
          });
      });
};