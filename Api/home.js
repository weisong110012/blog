const mysql=require('../models/mysql/mysql');

var home=  async(cxt,next)=>{
   var timeart=await mysql.fullSql(`select artid,title,userid,time,zhan,imgurl,des,arttype,username from artcle order by time desc limit 10;`);
   var hotart=await mysql.fullSql(`select artid,title,userid,time,zhan,imgurl,des,arttype,username from artcle order by zhan desc limit 10;`);
    cxt.response.body={timeart:timeart,hotart:hotart};
};

module.exports=home;

