const express = require('express');
const router = express.Router();
const balanceController = require('../../controllers/balanceController');

router.route('/').patch(balanceController.addBalance);

router.route('/:uid').get(balanceController.getBalance);

module.exports = router;
