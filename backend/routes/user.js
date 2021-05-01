//Imporation
const express = require("express");
const router = express.Router();
/*const dbRouter = require("../models/DB")*/
// //Raccourci

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
//Routage
router.get('/infouser/:id', userCtrl.getUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
/*router.post('/profile', auth, userCtrl.userProfil);//rajout AUTH possible*/
module.exports = router;