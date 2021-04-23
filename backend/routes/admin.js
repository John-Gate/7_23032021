//Imporation
const express = require("express");
const router = express.Router();
// //Raccourci
const adminCtrl = require("../controllers/admin");
const auth = require("../middleware/auth");
//Routage
router.get('/', adminCtrl.adminCheck);
router.put('/postModeration', adminCtrl.postModeration);
router.put('/commentModeration', adminCtrl.commentModeration);
router.put('/userModeration', adminCtrl.userModeration);
module.exports = router;