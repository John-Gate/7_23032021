//Imporation
const express = require("express");
const router = express.Router();
/*const dbRouter = require("../models/DB")*/
// //Raccourci

const userCtrl = require("../controllers/create");
const auth = require("../middleware/auth");
//Routage
router.post('/createPost, userCtrl.createPost);