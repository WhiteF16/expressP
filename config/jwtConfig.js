require('dotenv').config(); 

module.exports = {
  secret: process.env.JWT_SECRET, //读取 JWT 密钥
  expiresIn: process.env.JWT_EXPIRES_IN || '1h', //过期时间
};
