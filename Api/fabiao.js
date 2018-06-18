const mysql=require('../models/mysql/mysql');


var fabiao=async (cxt,next)=>{
    var fabiaodata= cxt.request.body;
    var session=cxt.cookies.get('session');
    var pinglun= await mysql.find('users',{id:fabiaodata.userid}).then(async data=>{
        if(data.length>0){
            return await mysql.insert('artcle',fabiaodata)
        }
    })
    cxt.body={status:1}
}

module.exports=fabiao