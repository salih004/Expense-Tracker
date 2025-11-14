const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/db');
const passport = require('./config/passport');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use('/api/user', userRoutes);
app.use('/api/expense', expenseRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const startServer = async () => {
  await testConnection((dbConnected) => {
    if (!dbConnected) {
      console.error('Warning: Database connection failed. Server will start but API calls may fail.');
      console.log('Make sure PostgreSQL is running and DATABASE_URL in .env is correct.');
      console.log('Run "npx prisma migrate dev" to initialize the database.');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  });
};

startServer();
