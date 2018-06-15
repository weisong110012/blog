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

var login=  async(cxt,next)=>{
    var body = cxt.request.body;
    var account=body.loginInfo.account;
    var password=body.loginInfo.password;
    var data= await mysql.findOne('users',{account:account,password:password}).then(async data =>{
       if(data.length<=0){
           cxt.response.body={status:0}
       }
       else {
           var sessionID=session(20)
           await mysql.update('users',{session:sessionID},{account:account,password:password});
           cxt.cookies.set('session',sessionID);

           cxt.response.body={status:1,userInfo:data[0]}
       }
    })
};

module.exports=login;

