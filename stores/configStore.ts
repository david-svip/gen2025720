import {defineStore} from 'pinia'

export const useConfigStore = defineStore('configStore',{
  state:() => {
    return{
      appConfig:undefined as any,
    }
  }
})