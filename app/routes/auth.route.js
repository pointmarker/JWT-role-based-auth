const express = require('express');
const {registerController,loginController,logoutController} = require('../controllers/auth.controller');
const { authorizeRole  } = require('../middleware/authorize'),
router = express.Router();

router.route('/register').post(registerController)
router.route('/login').post(loginController)
router.route('/logout').post(authorizeRole(['admin','coworker', 'member']),logoutController)

module.exports = router;