const express = require('express');
const {registerController, loginController, memberController, adminController, coworkerController,sharedController} = require('../controllers/auth.controller');
const { authorizeRole  } = require('../middleware/authorize'),
router = express.Router();


router.route('/register').post(registerController)
router.route('/login').post(loginController)

router.route('/feed').get(authorizeRole(['admin','coworker', 'member']), memberController)
router.route('/admin').get(authorizeRole(['admin']),adminController)
router.route('/coworker').get(authorizeRole(['coworker']), coworkerController)

router.route('/shared').get(authorizeRole(['coworker','admin']), sharedController)


module.exports = router;