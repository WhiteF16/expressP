const express = require("express");

const bodyParser = require('body-parser'); // 引入body-parser模块
const app = express();

const authRoutes = require('./routes/authRoutes');
 
app.use(bodyParser.json()); // 解析json数据格式
app.use(bodyParser.urlencoded({extended: true})); // 解析form表单提交的数据application/x-www-form-urlencoded

app.use('/auth', authRoutes);

app.listen(3000, () => {  
    console.log('Server is running at http://localhost:3000');   
});