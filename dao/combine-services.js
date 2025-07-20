const fs = require('fs');
const dataFilePath = 'dao/combine-file.json';

module.exports = {
  async getRemarkList(){
    const readed = await fs.readFileSync(dataFilePath,{encoding:'utf-8'});
    return readed
  },
  async addRemark(str){
    return new Promise((res,rej) => {
      fs.appendFileSync(dataFilePath, str+'|', { encoding: 'utf8', mode: 0o644 });
      res(str)
    })
  },
  async getComplexByTotal(arr, k){
    const that = this;
    let total = 0;
    async function backtrack(start, path) {
      const storeRecord = () => {
        return new Promise(async (res,rej) => {
          let str = '';
          if (path.length === k) {
            str = path.join(',');
            await that.addRemark(str);
            total++;
            console.log(total);
            res(str);
          }else{
            res(str);
          }
        });
      };
      // 如果路径长度等于k，添加到结果中
      let resultStr = await storeRecord();
      if(resultStr){
        return;
      }
  
      for (let i = start; i < arr.length; i++) {
        // 选择当前元素
        path.push(arr[i]);
        // 递归调用，注意下一次的起始位置是i+1，保证元素顺序不被重复考虑
        await backtrack(i + 1, path);
        // 撤销选择
        path.pop();
      }
    }
    await backtrack(0,[]);
  },
  generate(array,num){
    this.getComplexByTotal(array,num);
  },
  testFunc(){
    // let t = '067';
    // console.log(parseInt(t,8));
    let buffer = Buffer.from([0x62,0x75,0x66,0x66,0x65,0x72]);
    console.log(buffer.toString());
  }
}