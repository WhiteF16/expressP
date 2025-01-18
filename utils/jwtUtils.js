// utils/jwtUtil.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

// 生成 JWT token
const generateJWT = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
  }; // JWT 负载

  const token = jwt.sign(payload, jwtConfig.secret, {  // 使用密钥生成 JWT
    expiresIn: jwtConfig.expiresIn,
  });

  return token;
};

// 验证 JWT
const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret); // 解码并验证 token
    return decoded;  // 返回解码后的信息
  } catch (err) {
    return null;  // 验证失败时返回 null
  }
};

module.exports = {
  generateJWT,
  verifyJWT,
};
