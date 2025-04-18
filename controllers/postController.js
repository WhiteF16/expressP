const postServices = require('../services/postServices');


exports.deletePost=async (req,res,next)=>{
    try{
        const {postId}=req.body;
        const result=await postServices.deletePost(postId);
        res.status(200).json({
            success:true,
            message:result.message,
        });
    }catch(error){
        next(error);
    }
}
exports.insertPost=async(req,res,next)=>{
    try{
        const {userId,title,content}=req.body;
        const time=new Date();
        const result=await postServices.insertPost(userId,title,content,time);
        res.status(200).json({
            success:true,
            message:result.message,
        });
    }catch(error){
        next(error);
    }
}

exports.savePost=async(req,res,next)=>{
    try{
        const {postId,userId,title,content}=req.body;
        const time=new Date();
        const result=await postServices.savePost(postId,userId,title,content,time);
        res.status(200).json({
            success:true,
            message:result.message,
        });
    }catch(error){
        next(error);
    }
}

exports.editPost=async(req,res,next)=>{
    try{
        const {postId}=req.body;
        const result=await postServices.editPost(postId);
        res.status(200).json({
            success:true,
            message:result.message,
        });
    }catch(error){
        next(error);
    }
}

exports.collectPost=async(req,res,next)=>{
    try{
        const {postId}=req.body;
        const result=await postServices.savePost(postId);
        res.status(200).json({
            success:true,
            message:result.message,
        });
    }catch(error){
        next(error);
    }
}