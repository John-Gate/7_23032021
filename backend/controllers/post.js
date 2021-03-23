const Post = require('../models/Post');
const fs = require('fs');//pachage fs de node: nous donne accès aux fonctions qui nous permettent de modifier/supprimer le système de fichiers

exports.createPost = (req, res, next) => {

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
  post.save()//enregistre dans bdd
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost=(req, res, next)=>{
  Post.findOne({_id :req.params.id})//pour trouver la post ayant le meme id que params de requete
  .then((post) => res.status(200).json(post))
  .catch((error) => res.status(404).json({error:error})
  );
};
// on crée un objet postObject qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant. On crée ensuite une instance Post à partir de postObject , puis on effectue la modification.
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ?//y a t il une nouvelle image?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })//mettre à jour le Post qui correspond à l'objet que nous passons comme premier argument
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.getAllPosts = (req, res, next) =>{
  Post.find()//nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant toutes les Posts dans notre base de données.
  .then((posts)=> res.status(200).json(posts))
  .catch((error) => res.status(400).json({error}));
};

exports.likePost = (req, res, next) =>{
  if(req.body.like ==1){//si user a like
    Post.updateOne({_id: req.params.id}, {$inc:{likes:1}, $push:{usersLiked:req.body.userId },_id:req.params.id } )//c est l id qu on va modifie
    .then(posts=> res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
  }else if(req.body.like ==-1){//si user a dislike
    Post.updateOne({_id: req.params.id}, {$inc:{dislikes:1}, $push:{usersDisliked:req.body.userId },_id:req.params.id } )
    .then(posts=> res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
  }else if(req.body.like ==0){
    Post.findOne({_id: req.params.id})
    .then(posts=> {
      if(posts.usersLiked.find(user=> user===req.body.userId)){//si il avait like
        Post.updateOne({_id: req.params.id}, {$inc:{likes:-1}, $pull:{usersLiked:req.body.userId },_id:req.params.id } )
        .then(posts=> res.status(200).json(posts))
        .catch(error => res.status(400).json({error}));
      }
      if(posts.usersDisliked.find(user=> user===req.body.userId)){//si il avait dislike
        Post.updateOne({_id: req.params.id}, {$inc:{dislikes:-1}, $pull:{usersDisliked:req.body.userId },_id:req.params.id } )
        .then(posts=> res.status(200).json(posts))
        .catch(error => res.status(400).json({error}));
      }
    })
    .catch(error=>console.log(error));
  }
};

exports.commentPost = (req, res, next) => { // Ajouter un commentaire a une publication
  console.log(req.params.id)
  console.log(req.body)
  let newComment = {
    idUser: req.body.idUser,
    idPost: req.params.id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    date_ecriture: new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
    statut_moderation: 0,
    contenu: req.body.contenu
  }
  config.connection.query ('INSERT INTO comments SET?', newComment, function(err, results){
    if(err){
      res.status(500).json({err});
    }else{
      res.status(200);
    }
  })
};

