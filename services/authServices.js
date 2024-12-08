const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const db = require('../config/dbConfig');  // 连接数据库
const aQ=require('../db/queries/authQueries');

//登录功能，匹配密码是否正确
exports.authValidPwd = (email, password) => {//接收参数：邮箱，密码
  return new Promise((resolve, reject) => {//异步操作统一格式
    db.query(aQ.getPwd, [email], (err, results) => {
      if (err) return reject('数据库错误');
      if (results.length === 0) return resolve({ success: false, message: '邮箱未注册' });

      const user = results[0];
      
      // 使用 bcrypt 比较密码
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {//isMatch表示密码是否匹配
          return resolve({ success: false, message: '密码错误' });
        }

        // 密码正确，生成 JWT
        const token = jwtUtils.generateJWT(user);
        resolve({ success: true, token });
      });
    });
  });
};

//注册全功能，包括检查邮箱是否存在，密码加密，基本信息录入
exports.authRegister=(idName,email,password)=>{//接收参数：id昵称，邮箱，密码
    return new Promise((resolve,reject)=>{
        db.query(aQ.getEmail,[email],(err,results)=>{
            if (err) return reject('数据库错误');
            if (results.length != 0) return resolve({ success: false, message: '邮箱已注册' });
            
            bcrypt.hash(password,10,(err,hashedPwd)=>{//返回参数：报错和加密后的密码
                if(err) return reject("密码加密失败");

                db.query(aQ.insertBasicInfo,[idName,email,hashedPwd],(err,results=>{
                    if(err) return reject("注册失败");

                    resolve({success:true,meassage:"注册成功"});
                }))
            })
        })
    })
}

exports.authUpdate = (id, idName, gender, img) => {
  return new Promise((resolve, reject) => {
    let updateQueries = [];
    if (idName) {
      updateQueries.push(db.query(queries.updateIdName, [idName, id]));
    }
    if (gender) {
      updateQueries.push(db.query(queries.updateGender, [gender, id]));
    }
    if (img) {
      updateQueries.push(db.query(queries.updateImg, [img.buffer, id]));
    }
    if (updateQueries.length === 0) {
      return resolve({
        success: true,
        message: '没有需要更新的内容',
      });
    }
    // 使用 Promise.all 来并行执行所有的数据库更新操作
    Promise.all(updateQueries)
      .then(results => {
        resolve({
          success: true,
          message: '个人信息更新成功',
          results,
        });
      })
      .catch(err => {
        reject({
          success: false,
          message: '更新个人信息失败',
          error: err.message,
        });
      });
  });
};