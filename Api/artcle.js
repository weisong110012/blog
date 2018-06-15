const mysql=require('../models/mysql/mysql');

var artcle=  async(cxt,next)=>{
    var artid=cxt.request.body.artid;
    var artcle=await mysql.find('artcle',{artid:artid}).then(async data=>{
            return await mysql.find('pinglun',{artcleId:artid}).then(pinglun=>{
                data[0]['pinglun']=pinglun
                return data
             })
    })
    cxt.body=artcle
};
module.exports=artcle;