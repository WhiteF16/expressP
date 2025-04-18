const sleepServices=require('../services/sleepServices');;

exports.sleepScore=async(req,res,next)=>{
    try{
        const { userId, timestamp, sound, motion, light } = req.body;
        const result=await sleepServices.sleepScore(userId, timestamp, sound, motion, light);
        res.status(200).json({
            success:200,
            message:"",
            result
        })
    }catch(error){
        next(error);
    }
}