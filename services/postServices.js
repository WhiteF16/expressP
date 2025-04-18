const db = require('../config/dbConfig');  // 连接数据库
const pQ=require('../db/querires/postQueries')

exports.deletePost=async(postId)=>{
    try{
        await db.query(pQ.deletePost,[postId]);
        const result=db.query(pQ.searchPost,[postId]);
        if(result)
            throw{status:400,message:"删除失败"};
        else
            return{message:"删除成功"}
    }catch(error){
        if (error.status) {
            throw error;
          }
          throw { status: 500, message: ""};
    }
}
exports.insertPost=async(userId,title,content)=>{
    try{
        const result=await db.query(pQ.insertPost,[userId,title,content]);
        if(!result){
            throw{status:400,message:""}
        }else{
            return {message:""}
        }
    }catch(error){
        if (error.status) {
            throw error;
          }
          throw { status: 500, message: ""};
    }
}

exports.savePost=async(postId,userId,title,content)=>{
    try{
        if(postId==null){
            this.insertPost(userId,title,content);
        }
        await db.query(pQ.savePost,[postId,title,content]);
        const result =db.query(pQ.searchPost,[postId]);
        if(result)
            throw{status:400,message:"保存失败"};
        else  
            return{message:"保存成功"};
    }catch(error){
        if (error.status) {
            throw error;
          }
          throw { status: 500, message: ""};
    }
}

exports.sendPost=async()=>{
    try{
        const postId=await db.query(pQ.savePost,[userId,title,content]);
        const result =db.query(pQ.searchPost,[postId]);
        if(result)
            throw{status:400,message:"保存失败"};
        else  
            return{message:"保存成功"};
    }catch(error){
        if (error.status) {
            throw error;
          }
          throw { status: 500, message: ""};
    }
}

exports.editPost=async(postId)=>{
   try{
    const response =await db.query(pQ.getPostEdit,[postId]);
    return response;
   }catch(error){
    if(error.status){
        throw error;
    }
    throw {status:500,message:""}
   }
}

exports.sharePost=async(postId)=>{
    try{

    }catch(error){
        if(error.status){
            throw error;
        }
        throw{}
    }
}

exports.collectPost=async(postId)=>{
    try{
        const response =await db.query(pQ.collectPost,[postId,userId,collectListId]);
        const result=await db.query(pQ.selectCollect,[userId,postId,collectListId]);
        if(!result){
            throw{status:400,message:""}
        }
        return response;

    }catch(error){
        if(error.status){
            throw error;
        }
    }
}