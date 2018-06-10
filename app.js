const koa=require('koa'),
    koaRouter=require('koa-router'),
    koaStatic=require('koa-static'),
    request=require('request'),
    path=require('path'),
    app=new koa(),
    router=koaRouter(),
    fs=require('fs'),
    static=koaStatic(path.join(__dirname));
    app.use(static);
    app.listen(80);
    app.use(router['routes']());
    router.get('/',async (cxt, next)=>{
    cxt.body=fs.readFileSync('./index.html')
    });




