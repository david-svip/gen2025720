const fs = require('fs');
// import {Blob} from 'node:buffer';
const { Blob } = require('node:buffer');
// const { Buffer } = require('buffer');
// const createObjectURL = require('file-url');


module.exports = {
  async videoConvert(){
    const filePath = './assets/p-video1.mp4';
    const data = await fs.readFileSync(filePath);
    const blob = new Blob([data],{type:'video/mp4'});
    return blob;
  }
}