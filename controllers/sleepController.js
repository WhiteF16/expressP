const sleepServices=require('../services/sleepServices');;

const path = require('path');

exports.sleepScore=async(req,res,next)=>{
    const { userId,stimestamp,atimestamp,ltimestamp} = req.body;
    const soundFiles = req.files?.sound || [];
    const acclerationFiles = req.files?.accleration || [];
    const lightFiles = req.files?.light || [];
  
    const soundPath = soundFiles.map(file =>
      path.join('uploads', 'sound', path.basename(file.path))
    );
    const acclerationPath = acclerationFiles.map(file =>
      path.join('uploads', 'accleration', path.basename(file.path))
    );
    const lightPath = lightFiles.map(file =>
      path.join('uploads', 'light', path.basename(file.path))
    );
    try{
        await sleepServices.sleepScore(userId,soundPath,stimestamp,acclerationPath,atimestamp,lightPath,ltimestamp);
        res.status(200).json({
            success:200,
            message:"保存成功",
        })
    }catch(error){
        next(error);
    }
}