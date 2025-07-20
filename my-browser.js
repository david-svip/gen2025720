const puppeteer = require('puppeteer')

async function startBrowser(params) {
  // 启动浏览器
  const browser = await puppeteer.launch();
  // 创建一个新页面
  const page = await browser.newPage();
  // 打开一个网页
  await page.goto('https://example.com');
  // 获取页面标题并打印
  const title = await page.title();
  console.log('Page title:', title);
  // 关闭浏览器
  // await browser.close();
}

startBrowser().catch(err => console.error(err));
