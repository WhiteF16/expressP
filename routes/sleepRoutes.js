const express = require('express');
const router = express.Router();

router.post('/sleepData',loginLimiter,authController.login);

module.exports = router;