const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getUserDetails } = require('../controllers/userController');
const router = express.Router();

router.get('/me', protect, getUserDetails);

module.exports = router;