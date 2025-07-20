
window.addEventListener('load',() => {
  if('serviceWorker' in navigator){
    navigator.storage.estimate().then(estimate => {
      console.log('存储使用情况:', estimate);
    });
    const path = `/swlc.js`
    navigator.serviceWorker.register(path).then(registration => {
      console.log('SW 注册成功:', registration.scope);
    }).catch(err => {
      console.log('SW 注册失败:', err)
    })
  }
})


// 请求通知权限
function notificationTest() {
  showDesktopNotification();
}

function showDesktopNotification() {
  if (Notification.permission !== 'granted') return;
  const notification = new Notification('新消息提醒', {
    body: '您有3条未读消息，请及时查看',
    icon: '/icons/icon-192.png',
    image: '/images/logo.png',
    data: {
      url: 'https://www.google.com'
    }
  });
  notification.onclick = (event) => {
    window.open(event.target.data.url, '_blank');
    notification.close();
  };
}

