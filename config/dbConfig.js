// 加载 .env 文件
require('dotenv').config();

// 引入 mysql2 库
const mysql = require('mysql2');

// 使用环境变量配置数据库连接信息
const dbConfig = {
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 从连接池获取连接
pool.getConnection((err, connection) => {
  if (err) {
    return console.error('error connecting: ' + err.stack);//错误信息
  }
  console.log('connected as id ' + connection.threadId);//数据库连接标识符

  connection.release(); // 完成后释放连接
});

module.exports = pool;
