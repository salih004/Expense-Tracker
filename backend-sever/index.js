const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Placeholder routes
app.get('/Expense/:UserId', (req, res) => res.json([{ title: '', date: '', amount: 0 }]));
app.get('/Expense/:ExpenseId', (req, res) => res.json({ title: '', date: '', amount: 0 }));
app.post('/Expense/:UserId', (req, res) => res.json({ message: 'success' }));
app.delete('/Expense/:ExpenseId', (req, res) => res.json({ message: 'success' }));

app.get('/User/:UserId', (req, res) => res.json({ userId: 123, username: '', email: '' }));
app.post('/User', (req, res) => res.json({ message: 'success' }));

app.get('/Category/:UserId', (req, res) => res.json([{ name: '', description: '', date: '', amount: 0 }]));
app.post('/Category', (req, res) => res.json({ message: 'success' }));
app.delete('/Category/:CategoryId', (req, res) => res.json({ message: 'success' }));

app.post('/LinkExpense', (req, res) => res.json({ message: 'success' }));

// Start the server (only once)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
