// Utilisation de multer pour enregistrer les fichiers images
const multer = require('multer');

// Modification de l'extension des fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// Limite la taille de l'image
const maxSize = 1 * 1000 * 1000; //Max 1Mb

//Définition de l'emplacement de stockage et du nom du fichier
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // Génération du nom du fichier : nom d'origine + numero unique + . + extension
    const name = file.originalname.split(' ').join('_');
    const nameWithoutExt = name.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, nameWithoutExt + Date.now() + '.' + extension);
  }
});

//Permet de renvoyer un message d'erreur si pas bon format
const fileFilter = function (req, file, callback) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Seules les images de type jpg ou png sont autorisées.'), false);
  }
callback(null, true);
}

module.exports = (req, res, next) => {
    const upload = multer({storage: storage, limits: maxSize, fileFilter: fileFilter}).single('image');
    upload(req, res, function (err) {
      if (err) {res.status(403).json({error: err.message});}
      else {next();}
    })
  }