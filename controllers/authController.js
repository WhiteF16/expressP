const authServices = require('../services/authServices');
const { authSchema, registerSchema, verificationSchema, resetPwdSchema } = require('../validators/authValidators');

exports.login = async (req, res, next) => {
    console.log("try login");
  try {
    const { error } = authSchema.validate(req.body);
    if (error) return next({ status: 400, message: error.details[0].message });

    const { email, password } = req.body;

    const result = await authServices.authValidPwd(email, password);

    res.status(200).json({
      success: true,
      message: '登录成功',
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res,next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return next({ status: 400, message: error.details[0].message });

    const { email, password, code } = req.body;

    await authServices.verifyVerificationCode(email, code); // 服务调用
    await authServices.authRegister(email, password);

    return res.status(200).json({
      success: true,
      message: "注册成功！"
    });
  } catch (error) {
    next(error)
  }
};

exports.generateVerificationCode=async(req,res,next)=>{
  try{
    const { error } = verificationSchema.validate(req.body);
    if (error) return next({ status: 400, message: error.details[0].message });

    const { email } = req.body;

    const result=await authServices.generateVerificationCode(email);
    return res.status(200).json({
      success:true,
      message:result.message
    })
  }catch(error){
    next(error)
  }
}

exports.remakePwd=async(req,res,next)=>{

  console.log('JWT Payload:', req.user);  // 打印 req.user，查看是否包含解码后的用户信息

  try{
    const { error } = resetPwdSchema.validate(req.body);
    if (error) return next({ status: 400, message: error.details[0].message });

    const { email, password, code } = req.body;

    await authServices.verifyVerificationCode(email, code);
    const result=await authServices.remakePwd(email,password);
    return res.status(200).json({
      success: true,
      message: result.message,
    });

  }catch(error){
    next(error)
  }
}

exports.update=async (req,res)=>{
  const userId=req.user?.userId;
  console.log(req);
  const {username,gender}=req.body;
try{
  const result=await authServices.update(userId,username,gender);
}catch(error){
    next(error)
  }
}