const koa=require('koa'),
    koaRouter=require('koa-router'),
    koaStatic=require('koa-static'),
    request=require('request'),
    path=require('path'),
    http=require('http'),
    https=require('https'),
    socketio=require('socket.io'),
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
    fabiao=require('./Api/fabiao.js'),
    upload=require('./Api/upload.js'),
    zan=require('./Api/zan.js'),
    manshenghuo=require('./Api/manshenghuo.js'),
    static=koaStatic(path.join(__dirname));
    app.use(static);
    app.use(koaBody({multipart:true}));

    app.use(router['routes']());
    var server = http.Server(app.callback());
    var io = socketio(server);
    server.listen(80);
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
    router.post('/fabiao',fabiao);
    router.post('/upload',upload);
    router.post('/dianzhan',zan.dianzhan);
    router.post('/quxiaozhan',zan.quxiaozhan);
    router.post('/manshenghuo',manshenghuo);

    var socket=require('./socket/index.js')
    io.on('connection',socket);
