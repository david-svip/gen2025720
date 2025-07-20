const Router = require('koa-router');
const router = new Router();
const remarkAdapter = require('../dao/combine-services.js')

router.get('/',async (ctx) => {
  let d = await console.log('');
  
  ctx.body = {
    status: 1,
    data: 'root api'
  }
});

router.post('/remark',async ctx => {
  await remarkAdapter.addRemark(JSON.parse(ctx.request.body));
  ctx.body = {
    status: 1,
    data: 'success'
  }
})

router.post('/remark-update',async ctx => {
  await remarkAdapter.remarkUpdate(JSON.parse(ctx.request.body));
  ctx.body = {
    status: 1,
    data: 'success'
  }
})

router.get('/google-push', ctx => {
  let pushSubscription = {
    "endpoint":"https://fcm.googleapis.com/fcm/send/eeiq2lN3KOo:APA91bHp0_Mi1W5HWD4q3LP1G9l30WkxbF-94W8hqZebY7XSzYsEzRqovbcLW2sWdulXqqYKWdfOORtFvl6c_wp338HvGUSUv9E0XgDuNh9-zDOXEkkElnE13T8AAMqc56oSSHOFoks3",
    "keys":{
      "p256dh":"BJ8e_tijXSxhH_rMTSacZntLJQyVSzmmwLETHCCUiFNVq8lL2_-Dd3DMgwpzPztibINBYuVuxYyrbu_DD46WW9k",
      "auth":"LNTJNGmMOMPKOBRInP1JJw"
    }
  };
  try{
    webpush.sendNotification(pushSubscription, 'Hello world').then(result => {
        res.send(result);
    }).catch(e=>{
      ctx.body = e;
    })
    .finally(e => {
      ctx.body = e;
    })
  }catch(e){
    ctx.body = e;
  }
});

router.get('/crud-data-list.json',async ctx => {
  let dataRowList = await remarkAdapter.getRemarkList();
  ctx.body = {
    code: 1,
    success: true,
    data: dataRowList,
    msg: '',
  };
})

router.get('/qm-total', ctx => {
  let msgList = [4, 66, 99, 300, 200, 888];
  let r_index = Math.floor(Math.random() * msgList.length)
  ctx.body = {
    code: 1,
    success: true,
    data: msgList[r_index],
    msg: '',
  };
})

router.get('/home.json', ctx => {
  ctx.body = {
    status: 1,
    data: {
      tabs: [
        {
          id: "1001",
          name: "我的"
        },
        {
          id: '179523789172',
          name: "福利导航"
        },
        {
          id: '17923923842839',
          name: '成人视频'
        },
        {
          id: '1792328987239',
          name: 'V88体育',
        },
        {
          id: '17923478239',
          name: '开元棋牌'
        }
      ],
    }
  }
});

router.post('/log-test', (ctx) => {
  ctx.body = {
    status: 1,
    data: 'log to server success , main-router.js line 105'
  }
});
router.get('/data', (ctx, next) => {
  ctx.body = {
    status: 1,
    data: 'from server data'
  }
});
router.post('/upload',(ctx) => {
  if(ctx.request.files && ctx.request.files.file){
    const file = ctx.request.files.file;
    let data = {
      link:file.name,
      originalName:file.name,
      url:file.name,
    };
    ctx.body = { 
      data
    };
  } else {
    ctx.throw(400, '没有接收到文件');
  }
})

module.exports = router;
