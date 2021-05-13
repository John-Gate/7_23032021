console.log("toto")
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  "image/webp": "webp", // ne fonctionne pas sur MAC
  "image/gif": "gif"
};
console.log("toto2")
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    console.log("toto3")
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
console.log(storage)
module.exports = multer({storage: storage}).single('image'); // capacite de "20"images maximum rajouter ,20 apres 'image'