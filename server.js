const Koa = require('koa')
const https = require('https')
const Router = require('koa-router');
const cors2 = require('koa2-cors');
const webpush = require('web-push');
const remarkAdapter = require('./dao/data-adapter');
const {koaBody} = require('koa-body');
const videoRoute = require('./routes/video-test.js');
const mainRoute = require('./routes/main-router.js');
const spiderRoute = require('./routes/spider-router.js');
const combineServices = require('./dao/combine-services.js');
const staticServe = require('koa-static');
const path = require('path');
const fs = require('fs')

const staticPath = path.join(__dirname, 'assets');

const app = new Koa()
const router = new Router();

// 使用 koa-static 并配置 CORS 选项
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set(
//     'Access-Control-Allow-Methods', 
//     'GET,POST, GET, PUT, DELETE, OPTIONS');
//   ctx.set(
//     'Access-Control-Allow-Headers', 
//     'Origin, X-Requested-With, Content-Type, Accept');
//   await next();
// });

app.use(cors2({
  origin: function(ctx) {
    // 或者使用 '*' 来允许任意域名
    return ['http://localhost:2888']; 
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept','media-auth'],
}));

const uploadDir = path.join(__dirname, 'uploads');
app.use(koaBody({multipart:true},uploadDir));
app.use(staticServe(staticPath));

app
  .use(spiderRoute.routes())
  .use(mainRoute.routes())
  .use(videoRoute.routes())
  .use(router.routes())
  .use(router.allowedMethods())

const port = 6888
app.listen(port, () => {
  console.log('http://localhost:' + port)
});
