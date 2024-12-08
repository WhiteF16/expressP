const express=require("express");
const router=express.Router();
const db = require('../db/db.js');

router.post('/changePasswordOnline',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const newpassword=req.body.newpassword;

    let queryPassword='select password from `userbasicinformation` where email= ?'
    let queryChange='update userbasicinformation set password=? where email=?'
    db.querySql(queryPassword,[email]).then(data=>{
        if(data.length===0)
            res.send("邮箱不存在，请求出错！");
        else{
            if(data[0].password===password){
                db.querySql(queryChange,[newpassword,email]).then(data=>{
                    res.send("修改成功，请重新登录！");
                }).catch(err=>{
                    console.error(err);
                    res.status(500).send("服务器错误，请重新尝试！");
                })
            }
            else
                res.send("密码错误，请重新输入或者找回密码");
        }
    })
})

module.exports=router;