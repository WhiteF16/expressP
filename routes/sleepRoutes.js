const express = require('express');
const multerMiddleware=require('../middlewares/multerMiddleware')
const sleepController=require('../controllers/sleepController')
const router = express.Router();

router.post('/sleepData',multerMiddleware.combinedMiddleware,sleepController.sleepScore);

module.exports = router;