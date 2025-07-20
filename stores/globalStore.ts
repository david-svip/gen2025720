import { defineStore } from 'pinia'
import {useConfigStore} from '~/stores/configStore'
import { webSiteInfoApi } from '~/apis/data-v1'
import { getHomeJsonApi } from '~/apis'
// import { cryptoAES } from '@/utils/cryptoUtil'



export const useGlobalStore = defineStore('globalStore', {
	state: () => {
		return {
			version: '1.0.0',
			vantTheme: {
        dly: 'light',
        nfd: 'dark',
      } as any,
			defineTheme:'',
			appConfig:undefined as any,
			appData: undefined as any,
		}
	},
	persist:{
    key: 'globalStore',
    beforeRestore: (ctx) => {
      if (ctx.store.$id === 'globalStore') {
        if (import.meta.client) {
          if (
            window.location.pathname === '/' ||
            window.location.pathname.includes('/detail') ||
            window.location.pathname === '/launch'
          ) {
            window.localStorage.removeItem('globalStore')
          }
        }
      }
    },
    afterRestore: (ctx) => {
      
    },
    paths: [
      'version',
      'defineTheme',
      'themeColor',
      'appConfig',
      'webSiteId',
      'tenantId',
      'fullpage',
      'leftMenuHanndle',
      'loginWinHanndle',
      'siginWinHanndle',
      'successWinHanndle',
      'forgotPasswordWinHanndle',
      'shareWinHanndle',
      'bindInviteHanndle',
      'showFullPageLoading',
      'appData',
      'showSlideBar',
      'tabNavItem',
      'waterfallsFlowSize',
      'status',
      'refName',
      'isSponsoredAds',
      'isTourists',
      'encrypt',
      'videoDetail',
      'isDev',
      'domain',
      'serverApi',
      'jsonApi',
      'curVideoImageDomain',
      'curResourceDomain',
      'routeList',
      'clientApiList',
      'currtClientApi',
      'assertApiList',
      'currtAssertApi',
      'advDomainList',
      'curAdvDomain',
      'showPlayerAdvFlag',
      'themeColor',
      'qsDetailInfo',
      'clklog'
    ]
  },
	actions:{
		async getAppConfigAction(){
			return new Promise(async (resolve,reject) => {
				const configStore = useConfigStore();
				configStore.appConfig = '这是store测试初始赋值';
				let testRes = await webSiteInfoApi();
				resolve(testRes);
			})
		},
		changeThemeAction(theme:any){
			let isDly = (this.defineTheme == this.vantTheme.dly || !this.defineTheme);
			if(isDly){
				this.defineTheme = this.vantTheme.nfd;
				document.documentElement.style.setProperty('--van-primary-color',theme.buttonPrimaryColor);
				document.documentElement.style.setProperty('--van-danger-color',theme.tipsBgColor);
			}else{
				this.defineTheme = this.vantTheme.dly;
				document.documentElement.style.setProperty('--van-primary-color', 'var(--van-blue)');
				document.documentElement.style.setProperty('--van-danger-color', 'var(--van-red)');
			}
		},
		setThemeByTheme(theme:any){
			Object.entries(theme).forEach((dict:any) => {
				document.documentElement.style.setProperty(dict[0],dict[1]);
			})
		},
		async getHomeJsonAction(){
			let dataResult:any = await getHomeJsonApi();
			this.appData = dataResult.value.data;
		}
	}
})
