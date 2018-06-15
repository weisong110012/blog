const mysql=require('../models/mysql/mysql');

var manshenghuo= async(cxt,next)=>{
    var body = cxt.request.body;
    var manshenghuo=await mysql.fullSql(`select * from artcle where arttype = 2 order by time desc limit ${body.moreNum*10}, 10;`)

    cxt.response.body=manshenghuo

};


module.exports=manshenghuo;
