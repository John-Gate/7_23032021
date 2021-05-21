//Imporation
const express = require("express");
const router = express.Router();

//Raccourci
const multer = require("../middleware/multer-config")
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

//Routage
router.post('/createPost', auth, multer, postCtrl.createPublication);
router.get('/:id', auth, postCtrl.getOnePublication);
router.get('/',auth, postCtrl.getAllPublications);
router.put('/updatePost',auth, postCtrl.updatePublication);
router.post('/deletePost', auth, postCtrl.deletePublication);//a la place de delete(verb), car il y a des verifications.

module.exports = router;