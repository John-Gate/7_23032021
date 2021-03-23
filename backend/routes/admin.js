//Importation
const express = require('express');//pour creer rooter
const router = express.Router();
//Raccourci
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); //authentification
const adminController = require('../controllers/admin')
//Routage
router.post('/:id', auth, multer, adminController.createPost);
router.delete('/:id', auth, adminController.deletePost);
router.delete('/:id', auth, adminController.deleteUser);

//exporation router
module.exports = router;