const { prisma } = require('../config/db');

const getUserExpenses = async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { date: 'desc' }
    });

    res.status(200).json({
      success: true,
      items: expenses
    });
  } catch (error) {
    console.error('Error getting user expenses:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get expenses',
      error: error.message
    });
  }
};

const createExpense = async (req, res) => {
  const { userId } = req.params;
  const { amount, title, date, category_id } = req.body;

  if (!amount || !date) {
    return res.status(400).json({
      success: false,
      message: 'Please provide amount and date'
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be greater than 0'
    });
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        amount,
        title: title || null,
        date,
        userId: parseInt(userId),
        categoryId: category_id ? parseInt(category_id) : null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create expense',
      error: error.message
    });
  }
};

module.exports = {
  getUserExpenses,
  createExpense
};
