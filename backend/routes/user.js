const express = require('express');
const router = express.Router();

//Import du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');


//Import du middleware authSupUser pour sécuriser les routes de modification ou suppression user
const authSupUser = require('../middleware/authsupuser');

const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', authSupUser, userCtrl.getUserInfo);
router.put('/:id', authSupUser, multer, userCtrl.modifyUser); //Permet de modifier la photo de profil
router.delete('/:id', authSupUser, userCtrl.deleteUser); //Permet d'effacer un utilisateur


module.exports = router;