const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa();
const bodyparser= new BodyParser();

// 导入controller middleware:
const controller = require('./controller.js');
//设置跨域
app.use(
  cors({
      origin: function(ctx) { //设置允许来自指定域名请求
        return '*'; // 允许来自所有域名请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  //设置cors
  // ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

// middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyparser);
// 使用middleware:
app.use(controller());


app.listen(3000,()=>{
  console.log('server listening on: ' + 3000)
});
