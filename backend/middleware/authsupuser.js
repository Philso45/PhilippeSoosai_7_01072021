const jwt = require('jsonwebtoken');
const database = require('../config/database');

//Token caché
require('dotenv').config();

/*Même fonction que auth sauf qu'ici on cherche à savoir si l'utilisateur est l'administrateur 
ou la personne qui cherche à voir, modifier ou supprimer son compte */

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const findUserEmailQuery = `select email from users where id = ${userId}`;
    database.query(findUserEmailQuery, function (err, result) {
      if (!err) {
        if (result[0].email === process.env.DATABASE_ADMIN_EMAIL || req.params.id == userId) {next();}
        else res.status(401).json({error: 'Requête non authorisée'});
        } 
    else res.status(400).json({error: 'Mauvaise requête'});
    })
  }
  catch {res.status(400).json({error: 'Mauvaise requête'});}  
};