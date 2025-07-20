export const webSiteInfoApi = () => {
  return new Promise((resolve,reject) => {
    resolve('test');
  })
}

export const getApiData = () => {
  return new Promise((res,rej) => {
    useFetch('http://localhost:3100',{}).then(apiDataRes => {
      res(apiDataRes.data.value)
    })
  })
}

export const getAsyncData = async () => {
  return useAsyncData(
    'async-data-key',// 唯一键名，用于缓存
    () => {
      return new Promise((res,rej) => {
        setTimeout(() => {
          $fetch('http://localhost:3100').then(res1 => {
            res(res1);
          })
        },200)
      })
    }
  )
}