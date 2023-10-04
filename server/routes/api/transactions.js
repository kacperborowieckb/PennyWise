const express = require('express');
const router = express.Router();
const transactionsController = require('../../controllers/transactionsController');

router.route('/:uid').get(transactionsController.getTransactions);

module.exports = router;
