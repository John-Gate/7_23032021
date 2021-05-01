//Imporation
const express = require("express");
const router = express.Router();
// //Raccourci
const adminCtrl = require("../controllers/admin");
const auth = require("../middleware/auth");
//Routage
router.get('/', adminCtrl.adminCheck);
router.get('/showPost', adminCtrl.getAllPublications);
router.get('/showUser', adminCtrl.getAllUsers);
router.get('/showComment', adminCtrl.getAllComments);
router.put('/postModeration', adminCtrl.postModeration);
router.put('/commentModeration', adminCtrl.commentModeration);
router.put('/userModeration', adminCtrl.userModeration);
router.get('/statistics', adminCtrl.statistics);


module.exports = router;