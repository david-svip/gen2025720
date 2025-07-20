import type { UseFetchOptions } from 'nuxt/app'

type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT'

interface Options<T> extends UseFetchOptions<T>{
  cryptoData?:boolean
  isJson?:boolean
}

const sysFlag = import.meta.server ? 'Server' : 'Client'

class HttpRequest {

  async request<T = any>(url:string,method:Methods ,reqData:any,options?:Options<T>){

    const event = useRequestEvent()
    
    const newOptions:Options<T> = {
      timeout:10000,
      ...options,
      onRequest({request,options}:any){
        if(process.server){
          let test1 = `${event?.context.$routeId}-${sysFlag}端-接口发起请求`;
          let test2 = JSON.stringify({
            request,
            params:options.params,
            method:options.method,
            headers:options.headers,
            body:options.body
          });
          Logger.info(test1,test2);
        }
      }
    }
    const { data, status, error, refresh, clear } = await useFetch(url,newOptions)
    return data;
  }
}

export const httpRequest = new HttpRequest()