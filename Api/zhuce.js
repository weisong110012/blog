const mysql=require('../models/mysql/mysql');


var session=(n)=>{
    var res='';
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    while (n--){
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res
}

var zhuce=  async(cxt,next)=>{
    var body = cxt.request.body;
    var account=body.zhuceInfo.account;
    var password=body.zhuceInfo.password;
    var name=body.zhuceInfo.name;
    if((/\w{7,20}/.test(account))&&(/\w{6,20}/.test(password))&&(/[\s\S]{1,}/.test(name))){
        var sessionId=session(20)
        var data= await mysql.insert('users',{authType:2,account:account,password:password,session:sessionId,name:name}).then(async data =>{
            cxt.cookies.set('session',sessionId);
            cxt.response.body={status:1,userInfo:body.zhuceInfo}
        })
    }
    else{
        cxt.response.body={status:0}
    }
};

module.exports=zhuce;