//Imporation
const express = require("express");
const router = express.Router();

// //Raccourci
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

//Routage
router.get('/infouser/:id', userCtrl.getUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/deleteUser', userCtrl.deleteUser);

module.exports = router;