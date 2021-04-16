//Imporation
const express = require("express");
const router = express.Router();
// //Raccourci

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
//Routage
router.post('/createPost', postCtrl.createPublication);
router.get('/:id', postCtrl.getOnePublication);
// router.get('/', postCtrl.getAllPublications);
// router.update('/updatePost', postCtrl.updatePublication);
 router.post('/deletePost', postCtrl.deletePublication);//rajouter auth apres test '/createPost, auth, postCtrl.createPublication'
module.exports = router;