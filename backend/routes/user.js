//Imporation
const express = require("express");
const router = express.Router();
// //Raccourci
// const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");
//Routage
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/profile', userCtrl.userProfil);//rajout AUTH possible
module.exports = router;