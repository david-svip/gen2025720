// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  theme: 'dark',
  plugins:[
    '~/plugins/pinia.ts',
    '~/plugins/vant.ts'
  ],
  modules:['@vant/nuxt'],
  devServer:{
    host:'localhost',
    port:process.env.PORT ? parseInt(process.env.PORT) : 80,
  },
  vite:{
    css:{
      preprocessorOptions:{
        stylus:{
          
        }
      }
    }
  },
  runtimeConfig:{
    public:{
      logstash:{
        url:process.env.API_LOGSTASH_URL,
      }
    }
  }
})
