const sQ=require('../db/queries/sleepQueries');
exports.sleepScore=async(userId, soundPath, acclerationPath ,lightPath)=>{
  try{
    await db.query(sQ.insertDate,[userId,soundPath,stimestamp,acclerationPath,atimestamp,lightPath,ltimestamp])
    /*const response = await fetch("http://your-python-server-ip:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sound, motion, light }),
    });
    const score = await response.json(); 
    return score;*/
    return;
  }catch(error){
    if (error.status) {
      throw error;
    }
    throw { status: 500, message: "服务器出错，数据保存失败"};
  }
}