const express = require('express');
const {loginLimiter,registerLimiter,getVerificationCodeLimiter}=require('../middlewares/limitMiddleware')
const router = express.Router();


const authController = require('../controllers/authController');
const verifyJWT = require('../middlewares/JWTMiddleware');
const upload=require('../middlewares/multerMiddleware');


router.post('/login',loginLimiter,authController.login);

router.post('/register',registerLimiter,authController.register);

router.post('/getVerificationCode',getVerificationCodeLimiter,authController.generateVerificationCode);

router.post('/remakePwd',verifyJWT,authController.remakePwd);

module.exports = router;
