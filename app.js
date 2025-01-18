const express = require("express");
const cors = require("cors");

const bodyParser = require('body-parser');
const app = express();

//路由
const authRoutes = require('./routes/authRoutes');

//中间件
const errorMiddleware=require('./middlewares/errorMiddleware')

app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
  }));
  
app.options("*", cors());
 
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.urlencoded({extended: true})); // 解析form表单提交的数据application/x-www-form-urlencoded

//挂载路由
app.use('/auth', authRoutes);

//配置中间件
app.use(errorMiddleware.globalErrorMiddleware);//全局错误中间件

app.listen(3000, () => {  
    console.log('Server is running at http://localhost:3000');   
});
//app.listen(8081, '172.29.170.112', () => {
 //   console.log(`Server running on 172.29.170.112:${8081}`);
//  });