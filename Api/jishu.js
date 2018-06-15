const mysql=require('../models/mysql/mysql');

var jishu= async(cxt,next)=>{
    var body = cxt.request.body;
    var jishu=await mysql.fullSql(`select * from artcle where arttype = 1 order by time desc limit ${body.moreNum*10}, 10;`)
    cxt.response.body=jishu
};
module.exports=jishu;
