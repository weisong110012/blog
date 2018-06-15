const koa=require('koa'),
    koaRouter=require('koa-router'),
    koaStatic=require('koa-static'),
    request=require('request'),
    path=require('path'),
    app=new koa(),
    router=koaRouter(),
    koaBody = require('koa-body'),
    fs=require('fs'),
    home=require('./Api/home.js'),
    login=require('./Api/login.js'),
    zhuce=require('./Api/zhuce.js'),
    jishu=require('./Api/jishu.js'),
    artcle=require('./Api/artcle.js'),
    pinglun=require('./Api/pinglun.js'),
    manshenghuo=require('./Api/manshenghuo.js'),
    static=koaStatic(path.join(__dirname));
    app.use(static);
    app.use(koaBody());
    app.listen(80);
    app.use(router['routes']());
    router.get('/',async (cxt, next)=>{
    cxt.body=fs.readFileSync('./index.html')
    });
    router.prefix('/api');
    router.get('/home',home);
    router.post('/login',login);
    router.post('/zhuce',zhuce);
    router.post('/jishu',jishu);
    router.post('/artcle',artcle);
    router.post('/pinglun',pinglun);
    router.post('/manshenghuo',manshenghuo);