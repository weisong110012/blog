const mysql=require('../models/mysql/mysql');

var home=  async(cxt,next)=>{
   var timeart=await mysql.fullSql(`select * from artcle order by time desc limit 10;`);
   var hotart=await mysql.fullSql(`select * from artcle order by zhan desc limit 10;`);
    console.log( cxt.cookies.get('userName'))
    cxt.response.body={timeart:timeart,hotart:hotart};
};

module.exports=home;

