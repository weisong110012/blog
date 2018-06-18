const mysql=require('../models/mysql/mysql');
var zan={
    async quxiaozhan(cxt,next){
        var artid=cxt.request.body.artid;
        await mysql.fullSql(`update artcle set zhan=zhan-1 where artid=${artid}`).then(data=>{
            cxt.response.body='1'
        })

    },
    async dianzhan(cxt,next){
        var artid=cxt.request.body.artid;
        await mysql.fullSql(`update artcle set zhan=zhan+1 where artid=${artid}`).then(data=>{
            cxt.response.body='1'
        })
    }
}
module.exports=zan