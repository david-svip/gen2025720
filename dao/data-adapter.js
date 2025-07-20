const fs = require('fs');
const dataFilePath = 'remark-file.json';

const dataAdapter = {
  async addRemark(dataObj){
    let dataList = await this.getRemarkList();
    dataList.push(dataObj);
    await fs.writeFileSync(dataFilePath,JSON.stringify(dataList))
    return {status:1,}
  },
  async getRemarkList(){
    const readed = await fs.readFileSync(dataFilePath,{encoding:'utf-8'});
    return JSON.parse(readed);
  },
  async remarkUpdate(dataObj){
    let dataList = await this.getRemarkList();
    let found = dataList.filter(item => item.id == dataObj.id)[0];
    if(found){
      Object.assign(found,dataObj);

      await fs.writeFileSync(dataFilePath,JSON.stringify(dataList))
      return {status:1,}
    }
    
  }
};

module.exports = dataAdapter;
