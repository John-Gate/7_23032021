//Importation
const express = require('express');
const router = express.Router();
//Raccourci
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const admin = require('../controllers/admin');
//Routage
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost );
router.put('/:id', auth, multer, postCtrl.modifyPost );
//router.post('/:id/comment', auth, postCtrl.commentPost );
router.post('/:id/comment', auth, postCtrl.commentPost );
router.post('/:id/like', auth, postCtrl.likePost );
//exportation rooter
module.exports = router;

//user: status si valider ou pas 0/1(valider par admin)
//type: 1 user 2 admin
//email password,nom, prenom,telephonne, date d inscription(current timestamp)...
//post: titre,contenu,cle etrangere autheur, date de creation, de modif,
//comment: 1 contenu, cle etrsngere auth post, date de creation
