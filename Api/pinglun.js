const mysql=require('../models/mysql/mysql');


var pinglun=async (cxt,next)=>{
    var pinglundata= cxt.request.body;
    var session=cxt.cookies.get('session');

    var pinglun= await mysql.find('users',{session:session}).then(async data=>{
        if(data.length>0){
           return await mysql.insert('pinglun',pinglundata)
        }
    })
    cxt.body={status:1}
}

module.exports=pinglun