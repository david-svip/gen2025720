const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');

router.get('/video-blob-test',async (ctx) => {
  const videoPath = path.join(__dirname, '../assets/record1.mp4');
  // const stat = fs.statSync(videoPath);
  // const fileSize = stat.size;
  const buffer = fs.readFileSync(videoPath); // 读取视频文件到 buffer
  const blobType = 'video/mp4'; // 视频文件的 MIME 类型
  const blob = new Buffer.from(buffer); // 将 buffer 转换为 Blob 兼容的格式（实际上在 Node 中 Blob 是客户端的 API）
  const blobBase64 = blob.toString('base64'); // 将 buffer 转换为 base64 字符串
  const blobUrl = `data:${blobType};base64,${blobBase64}`; // 创建 Blob URL
  ctx.body = blobUrl
  // ctx.body = `
  //   <!DOCTYPE html>
  //   <html>
  //   <body>
  //     <video controls class='aaa-bbb'>
  //       <source src="${blobUrl}" type="${blobType}">
  //       Your browser does not support the video tag.
  //     </video>
  //   </body>
  //   </html>
  // `;
});


module.exports = router;
