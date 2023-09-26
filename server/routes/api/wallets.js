const express = require('express');
const router = express.Router();
const walletsController = require('../../controllers/walletsController');

router.route('/').patch(walletsController.addBalance);

module.exports = router;
