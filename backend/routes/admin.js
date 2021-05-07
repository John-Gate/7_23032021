//Imporation
const express = require("express");
const router = express.Router();
// //Raccourci
const adminCtrl = require("../controllers/admin");
const auth = require("../middleware/auth");
//Routage
router.get('/showPost', auth, adminCtrl.getAllPublications);
router.get('/showUser', auth, adminCtrl.getAllUsers);
router.get('/showComment', auth, adminCtrl.getAllComments);
router.put('/postModeration/:id', auth, adminCtrl.postModeration);
router.put('/commentModeration/:id', auth, adminCtrl.commentModeration);
router.put('/userModeration/:id', auth, adminCtrl.userModeration);
router.get('/statistics', auth, adminCtrl.statistics);


module.exports = router;