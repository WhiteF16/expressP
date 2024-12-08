const authServices = require('../services/authServices');

exports.login = async (req, res) => {//登录
  const { email, password } = req.body; // 获取请求体中的邮箱和密码
  try {
    // 调用 authServices 的 authValidPwd 方法进行验证
    const result = await authServices.authValidPwd(email, password);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: '登录成功',
        token: result.token  // 返回生成的 JWT
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
};

exports.register=async(req,res)=>{//注册
    const {idName,email,password}=req.body;//接收参数
     try{
        const result = await authServices.authRegister(idName,email, password);
        if (result.success) {
            res.status(200).json({
            success: true,
            message: '注册成功',
            });
        } else {
            res.status(400).json({
            success: false,
            message: result.message
            });
        }
        } catch (error) {
        res.status(500).json({
            success: false,
            message: '服务器错误'
        });
    }
};

exports.updateProfile = (req, res) => {
  const userId = req.user.id;  // 从 JWT 中获取用户 ID
  const { idName, gender } = req.body; // 从请求体中获取用户提供的个人信息
  const img=req.file;

  authServices.authUpdate(userId, idName, gender, img)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};