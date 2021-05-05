//Imporation
const express = require("express");
const router = express.Router();
// //Raccourci

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
//Routage
router.post('/createPost',auth, postCtrl.createPublication);
router.get('/:id', auth, postCtrl.getOnePublication);
router.get('/',auth, postCtrl.getAllPublications);
router.put('/updatePost',auth, postCtrl.updatePublication);
router.post('/deletePost', auth, postCtrl.deletePublication);//a la place de delete(verb), car il y a des verifications.
 //rajouter auth apres test '/createPost, auth, postCtrl.createPublication'
module.exports = router;