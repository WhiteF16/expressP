const pool = require('../config/dbConfig');


// 新建查询连接
function querySql(sql,params) { 
  return new Promise((resolve, reject) => {
    pool.getConnection((err,conn)=>{
      if(err){
        reject(err);
        return;
      }
      conn.query(sql,params,(err,res)=>{
        conn.release();
        if(err)
          reject(err);
        else
          resolve(res);
      });
    });
  });
}
 
module.exports = {
  querySql
};