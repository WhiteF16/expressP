exports.sleepScore=async(userId, timestamp, sound, motion, light)=>{
  try{
    const response = await fetch("http://your-python-server-ip:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sound, motion, light }),
    });
    const score = await response.json(); 
    return score;
  }catch(error){

  }
}