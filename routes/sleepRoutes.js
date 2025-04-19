const express = require('express');
const combinedMiddleware=require('../middlewares/multerMiddleware')
const sleepController=require('../controllers/sleepController')
const router = express.Router();

router.post('/sleepData',combinedMiddleware,sleepController.sleepScore);

module.exports = router;