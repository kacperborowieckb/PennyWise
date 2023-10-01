const express = require('express');
const router = express.Router();
const expenseController = require('../../controllers/expenseController');

router.route('/').post(expenseController.addExpense);

module.exports = router;
