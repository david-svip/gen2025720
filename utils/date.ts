export const padStartBy0 = (str:String|Number,maxLen?:number) => {
  const translated = '' + str;
  return translated.padStart(maxLen?maxLen:2,'0');
}
export const dateFormat = (dateParam:any,formatStr?:String) => {
  const target = new Date(dateParam);
  const year = target.getFullYear();
  const month = padStartBy0(target.getMonth() + 1);
  const date = padStartBy0(target.getDate());
  const hourse = padStartBy0(target.getHours());
  const minutes = padStartBy0(target.getMinutes());
  const second = padStartBy0(target.getSeconds());
  const mSecond = padStartBy0(target.getMilliseconds(),3)
  
  if(!formatStr || formatStr == 'YYYY-MM-dd HH:mm:ss'){
    return `${year}-${month}-${date} ${hourse}:${minutes}:${second}`;
  }
  if(formatStr == 'MM/dd'){
    return `${month}/${date}`;
  }
  if(formatStr == 'HH:mm'){
    return `${hourse}:${minutes}`;
  }
  if(formatStr == 'HH:mm:ss'){
    return `${hourse}:${minutes}:${second}`;
  }
  if(formatStr == 'HH:mm:ss:ms'){
    return `${hourse}:${minutes}:${second}:${mSecond}`;
  }
  if(formatStr == 'YYYY-MM-dd HH:mm:ss:ms'){
    return `${year}-${month}-${date} ${hourse}:${minutes}:${second}:${mSecond}`;
  }
  return '';
}