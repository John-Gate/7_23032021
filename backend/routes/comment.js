//Imporation
const express = require("express");
const router = express.Router();

// //Raccourci
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

//Routage
router.post('/reply', auth, commentCtrl.createComment);
module.exports = router;