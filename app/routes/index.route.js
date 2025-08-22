const express = require('express');
const authRoute = require('./auth.route');
const apiRoute = require('./api.route')
const { memberController, adminController, coworkerController,sharedController}  = require('../controllers/auth.controller')
const {serveStatic} = require('../services/static.service')
const { authorizeRole  } = require('../middleware/authorize');
const router = express.Router();

router.use('/auth',authRoute)
router.use('/api',apiRoute)

router.route('/feed').get(authorizeRole(['admin','coworker', 'member']), memberController,serveStatic('feed'))
router.route('/admin').get(authorizeRole(['admin']),adminController,serveStatic('admin'))
router.route('/coworker').get(authorizeRole(['coworker']), coworkerController,serveStatic('coworker'))
router.route('/shared').get(authorizeRole(['coworker','admin']), sharedController,serveStatic('shared'))

module.exports = router;