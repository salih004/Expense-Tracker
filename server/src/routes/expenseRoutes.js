const express = require('express');
const router = express.Router();
const {
  getUserExpenses,
  createExpense,
  deleteExpense
} = require('../controllers/expenseController');
const { authenticateJWT } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateJWT);

router.get('/:userId', getUserExpenses);

router.post('/:userId', createExpense);

router.delete('/:userId/:expenseId', deleteExpense);

module.exports = router;
