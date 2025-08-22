const express = require('express');
const {authorizeRole} = require('../middleware/authorize')
const { currentUserController } = require('../controllers/api.controller');
const router = express.Router();


router.route('/current-user').post(authorizeRole(['admin', 'member', 'coworker']),currentUserController)

module.exports = router;
