const express = require('express');
const router = express.Router();
const balanceController = require('../../controllers/balanceController');

router.route('/').patch(balanceController.addBalance);

module.exports = router;
