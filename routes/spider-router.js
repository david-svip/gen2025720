
const puppeteer = require('puppeteer');
const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');
const http = require('http');
const httpProxy = require('http-proxy');

router.get('/gulfnews',async (ctx) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://gulfnews.com/');
  const pageTitle = await page.title()
  const html = await page.content();
  await browser.close();
  ctx.body = html

});


module.exports = router;

