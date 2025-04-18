const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const xssClean = require('xss-clean');
const app = express();

//路由
const authRoutes = require('./routes/authRoutes');

//中间件
const errorMiddleware=require('./middlewares/errorMiddleware')

app.use(cors({//挂载cors中间件处理跨域资源
    origin: "*", //允许任何域名发起请求
    methods: "GET,POST,PUT,DELETE,OPTIONS",//允许的请求类型
    allowedHeaders: "Content-Type,Authorization"//允许的请求头
  }));
  
app.options("*", cors());//告知浏览器接收所有cors预检请求(options请求)
 
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.urlencoded({extended: true})); // 解析form表单提交的数据application/x-www-form-urlencoded

app.use(xssClean());//防止xss攻击

//挂载路由
app.use('/auth', authRoutes);
app.use('/sleep',sleepRoutes);

//配置中间件
app.use(errorMiddleware.globalErrorMiddleware);//全局错误中间件

app.listen(3000, () => {  
    console.log('Server is running at http://localhost:3000');   
});
//app.listen(8081, '172.29.170.112', () => {
 //   console.log(`Server running on 172.29.170.112:${8081}`);
//  });