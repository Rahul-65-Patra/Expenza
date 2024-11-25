const express = require('express');
const {loginController, registerController} = require('../controllers/userController.js');
// rouetr object
const router = express.Router();

// routers
//POST || LOGIN
router.post('/login',loginController)
//POST || REGISTER
router.post('/register',registerController)

module.exports = router;