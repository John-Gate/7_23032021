//Imporation
const express = require("express");
const router = express.Router();
// //Raccourci
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
//Routage
// router.get('/:id', commentCtrl.getAllComments);
router.post('/commentary', commentCtrl.createComment);
module.exports = router;