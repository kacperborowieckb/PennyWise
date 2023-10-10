const express = require('express');
const router = express.Router();
const plannedTransactionsController = require('../../controllers/plannedTransactionsController');

router.route('/').post(plannedTransactionsController.addPlannedTransaction);

router.route('/:uid').get(plannedTransactionsController.getPlannedTransactions);

module.exports = router;
