const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById } = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/:userId', authenticateJWT, getUserById);

module.exports = router;
