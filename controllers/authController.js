const authServices = require('../services/authServices');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("email:" + email);

  if (!email) {
    return next({ status: 400, message: "请填写邮箱" });
  }
  if (!password) {
    return next({ status: 400, message: "请填写密码" });
  }

  try {
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
  const {email,password,code } = req.body;
  if (!email) {
    return next({status:400,message:"请填写邮箱"})
  }
  if (!password) {
    return next({ status: 400, message: "请填写密码" });
  }
  if (!code) {
    return next({ status: 400, message: "请填写验证码" });
  }
  try {
    // 调用验证码验证服务
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


exports.updateProfile = async (req, res) => {
  console.log('JWT Payload:', req.user);  // 打印 req.user，查看是否包含解码后的用户信息

  const userId = req.user?.userId;  // 安全访问 userId，避免 undefined 错误

  if (!userId) {
    return res.status(401).json({ message: '未找到用户ID' });  // 如果没有 userId，返回错误
  }

  const { idName, gender } = req.body;
  const img = req.file;

  try {
    // 调用 authServices 的 authUpdate 方法更新用户信息
    const response = await authServices.authUpdate(userId, idName, gender, img);
    return res.status(200).json(response);
   
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '更新失败',
      error: error.message
    });
  }
};

exports.generateVerificationCode=async(req,res,next)=>{
  const email=req.body.email;
  if(!email){
   return next({status:400,message:"请填写邮箱！"})
  }
  try{
    const response=await authServices.generateVerificationCode(email);
    return res.status(200).json({
      success:true,
      message:response.message
    })
  }catch(error){
    next(error)
  }
}

/*exports.verifyVerificationCode = async (req, res) => {//验证验证码，在controller被调用于登录和注册
  const { email, code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: "false",
      message: "请填写验证码",
    });
  }

  try {
    const response = await authServices.verifyVerificationCode(email, code);
    return res.status(200).json(response); 
  } catch (error) {
    const statusCode = error.status || 500; 
    return res.status(statusCode).json({
      success: "false",
      message: error.message || "验证码验证失败，请重新验证",
    });
  }
};*/

exports.remakePwd=async(req,res,next)=>{
  const {email,password,code}=req.body;

  console.log('JWT Payload:', req.user);  // 打印 req.user，查看是否包含解码后的用户信息
  
  if (!email) {
    return next({status:400,message:"请填写邮箱！"})
  }
  if (!password) {
    return next({status:400,message:"请填写密码！"})
  }
  if (!code) {
    return next({status:400,message:"请填写验证码！"})
  }
  try{
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