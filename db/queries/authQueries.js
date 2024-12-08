module.exports={
    getPwd:'SELECT id,password,email FROM userbasicinformation WHERE email = ?',//通过邮箱查找id，密码和邮箱
    getEmail:'SELECT email FROM userbasicinformation where email =?',//通过邮箱查找邮箱

    insertBasicInfo:'insert into `userbasicinformation` (idName,email,password) values(?,?,?)',//插入昵称，邮箱和密码

    updateIdName: 'UPDATE userbasicinformation SET idName = ? WHERE id = ?',

    updateGender: 'UPDATE userbasicinformation SET gender = ? WHERE id = ?',

    updateImg: 'UPDATE userbasicinformation SET img = ? WHERE id = ?',
}