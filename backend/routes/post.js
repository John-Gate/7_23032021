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
router.put('/updatePost', postCtrl.updatePublication);
router.post('/deletePost', postCtrl.deletePublication);//a la place de delete(verb), car il y a des verifications.
 //rajouter auth apres test '/createPost, auth, postCtrl.createPublication'
module.exports = router;