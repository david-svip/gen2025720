<template>
  <div class="index-wrapper">
    
    <div class="g-container">
      <div class="row-space" v-for="space of spaceList" 
        :style="{'background-color':`var(${space.bg})`}">
      </div>
    </div>

    <van-cell-group>
      <van-cell value="内容">
        <template #title>
          <span class="custom-title">
            hello {{ welcome }}
          </span>
          <van-tag type="primary">标签</van-tag>
        </template>
      </van-cell>
      <van-cell value="内容">
        <template #title>
          <app-msg />
        </template>
      </van-cell>
      <van-cell value="内容">
        <template #title>
          <pre>useFetch 接口数据{{ apiData1 }}</pre>
        </template>
      </van-cell>
      <van-cell value="内容">
        <template #title>
          <div>
            useAsyncData 接口异步数据：{{ asyncDataTest.data }}
          </div>
        </template>
      </van-cell>
      <van-cell title="单元格" icon="shop-o">
        <template #right-icon>
          <van-icon name="search" class="search-icon" />
        </template>
      </van-cell>
      <van-cell value="时钟" >
        <template #title>
          <div>{{ timer }}</div>
        </template>
      </van-cell>
      <van-cell value="主题" >
        <template #title>
          <van-button type="primary" @click="msgShowClick" size="mini">
            消息
          </van-button>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="text-container">
      这里是一些很长很长的文本，需要分成多行显示，当超过两行时，应该显示省略号。
    </div>
    
    <div class="scroll-content-wrapper">
      <van-grid :column-num="3">
        <van-grid-item v-for="value in iconObjList" :key="value.icon" :icon="value.icon">
          <van-icon :name="value.icon" size="40" />
        </van-grid-item>
      </van-grid>
    </div>

    <div class="theme-list-choice">
      <div v-for="(themeItem,i) of themelist">
        <van-button round size="mini" :color="themeItem['--van-primary-color']" 
              @click="themeChangeClick(themeItem)">
          主题{{ i + 1 }}
        </van-button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import { getAsyncData } from '../apis/data-v1'
import { getDataTsApi } from '../apis'
import {useGlobalStore} from '../stores/globalStore'
const globalStor = useGlobalStore()
const welcome = ref('你好吗');

const invokData:any = await useAsyncData('test11',() => getDataTsApi());
const apiData1 = ref(invokData.data);

const { data: asyncDataTest } = await getAsyncData();

const themeChangeClick = (theme:any) => {
  globalStor.setThemeByTheme(theme);
}
const msgShowClick = () => {
  showNotify('test')
}
let timerTimeout = 0 as any;
const timer = ref('')
const timerRun = () => {
  clearTimeout(timerTimeout);
  timerTimeout = setTimeout(() => {
    timer.value = dateFormat(new Date(),'YYYY-MM-dd HH:mm:ss:ms');
    timerRun();
  },1);
}
timerRun();
const themelist = ref([
  {
    '--van-primary-color':'var(--van-blue)',
    '--van-danger-color':'var(--van-red)',
    '--van-background-2':'var(--van-white)',
    '--van-text-color':'var(--van-gray-8)',
    '--van-bg-yellow':'yellow',
    '--van-bg-pp1':'#df1390',
  },
  {
    '--van-primary-color':'#db9400',
    '--van-danger-color':'#f69004',
    '--van-background-2':'#3c3939',
    '--van-text-color':'var(--van-white)',
    '--van-bg-yellow':'#eeb217',
    '--van-bg-pp1':'#c613df',
  },
  {
    '--van-primary-color':'#e15d59',
    '--van-danger-color':'#f69004',
    '--van-background-2':'#6f4949',
    '--van-text-color':'#f6c6c6',
    '--van-bg-yellow':'#c3dd16',
    '--van-bg-pp1':'#7613df',
  }
])

const iconObjList = ref([
  {
    icon:'chat-o',
  },
  {
    icon:'cart-o',
  },
  {
    icon:'fire-o',
  },
  {
    icon:'arrow',
  },
  {
    icon:'arrow-left',
  },
  {
    icon:'arrow-up',
  },
  {
    icon:'arrow-down',
  },
  {
    icon:'arrow-double-left',
  },
  {
    icon:'arrow-double-right',
  },
  {
    icon:'success',
  },
  {
    icon:'cross',
  },
  {
    icon:'plus',
  },
  {
    icon:'minus',
  },
  {
    icon:'fail',
  },
  {
    icon:'circle',
  },
    {icon:'location-o',},
    {icon:'like-o',},
    {icon:'star-o',},
    {icon:'phone-o',},
    {icon:'setting-o',},
    {icon:'fire-o',},
    {icon:'coupon-o',},
    {icon:'cart-o',},
    {icon:'shopping-cart-o',},
    {icon:'cart-circle-o',},
    {icon:'friends-o',},
    {icon:'comment-o',},
    {icon:'gem-o',},
    {icon:'gift-o',},
    {icon:'point-gift-o',},
    {icon:'send-gift-o',},
    {icon:'service-o',},
    {icon:'bag-o',},
    {icon:'todo-list-o',},
    {icon:'balance-list-o',},
    {icon:'close',},
    {icon:'clock-o',},
    {icon:'question-o',},
    {icon:'passed',},
    {icon:'add-o',},
    {icon:'gold-coin-o',},
    {icon:'info-o',},
    {icon:'play-circle-o',},
    {icon:'pause-circle-o',},
    {icon:'stop-circle-o',},
    {icon:'warning-o',},
    {icon:'phone-circle-o',},
    {icon:'music-o',},
    {icon:'smile-o',},
    {icon:'thumb-circle-o',},
    {icon:'comment-circle-o',},
    {icon:'browsing-history-o',},
    {icon:'underway-o',},
    {icon:'more-o',},
    {icon:'video-o',},
    {icon:'shop-o',},
    {icon:'shop-collect-o',},
    {icon:'share-o',},
    {icon:'chat-o',},
    {icon:'smile-comment-o',},
    {icon:'vip-card-o',},
    {icon:'award-o',},
    {icon:'diamond-o',},
    {icon:'volume-o',},
    {icon:'cluster-o',},
    {icon:'wap-home-o',},
    {icon:'photo-o',},
    {icon:'gift-card-o',},
    {icon:'expand-o',},
    {icon:'medal-o',},
    {icon:'good-job-o',},
    {icon:'manager-o',},
    {icon:'label-o',},
    {icon:'bookmark-o',},
    {icon:'bill-o',},
    {icon:'hot-o',},
    {icon:'hot-sale-o',},
    {icon:'new-o',},
    {icon:'new-arrival-o',},
    {icon:'goods-collect-o',},
    {icon:'eye-o',},
    {icon:'delete-o',},
    {icon:'font-o',},
    {icon:'contact-o',},
    {icon:'notes-o',},
    {icon:'records-o',},
    {icon:'cash-back-record-o',},
    {icon:'newspaper-o',},
    {icon:'discount-o',},
    {icon:'completed-o',},
    {icon:'user-o',},
    {icon:'description-o',},
    {icon:'balance-o',},
    {icon:'refund-o',},
    {icon:'birthday-cake-o',},
    {icon:'orders-o',},
    {icon:'tv-o',},
    {icon:'envelop-o',},
    {icon:'flag-o',},
    {icon:'flower-o',},
    {icon:'filter-o',},
    {icon:'bar-chart-o',},
    {icon:'chart-trending-o',},
    {icon:'brush-o',},
    {icon:'bullhorn-o',},
    {icon:'hotel-o',},
    {icon:'cashier-o',},
    {icon:'warn-o',},
    {icon:'calendar-o',},
    {icon:'bulb-o',},
    {icon:'user-circle-o',},
    {icon:'desktop-o',},
    {icon:'apps-o',},
    {icon:'home-o',},
    {icon:'back-top',},
    {icon:'search',},
    {icon:'points',},
    {icon:'edit',},
    {icon:'qr',},
    {icon:'qr-invalid',},
    {icon:'closed-eye',},
    {icon:'down',},
    {icon:'scan',},
    {icon:'revoke',},
    {icon:'free-postage',},
    {icon:'certificate',},
    {icon:'logistics',},
    {icon:'after-sale',},
    {icon:'exchange',},
    {icon:'upgrade',},
    {icon:'ellipsis',},
    {icon:'sign',},
    {icon:'failure',},
    {icon:'ecard-pay',},
    {icon:'peer-pay',},
    {icon:'balance-pay',},
    {icon:'credit-pay',},
    {icon:'debit-pay',},
    {icon:'cash-on-deliver',},
    {icon:'other-pay',},
    {icon:'tosend',},
    {icon:'pending-payment',},
    {icon:'paid',},
    {icon:'aim',},
    {icon:'idcard',},
    {icon:'replay',},
    {icon:'shrink',},
    {icon:'shield-o',},
    {icon:'guide-o',},
    {icon:'cash-o',},
    {icon:'link-o',},
    {icon:'miniprogram-o',},
    {icon:'list-switch',},
    {icon:'list-switching',},
]);

const spaceList = ref([
  {
    bg:'--van-primary-color',
  },
  {
    bg:'--van-success-color',
  },
  {
    bg:'--van-warning-color',
  },
  {
    bg:'--van-danger-color',
  },
  {
    bg:'--van-bg-yellow',
  },
  {
    bg:'--van-bg-pp1',
  }
])

onMounted(() => {
  themeChangeClick(themelist.value[0]);
})
</script>

<style lang="stylus">
@import '../assets/app.styl'

.g-container{
  width:100%;
  height:218px;
  display:grid;
  grid-template-columns:repeat(2,1fr);
  grid-template-rows:20% auto 60px;
  grid-gap:4px 3px;
}
.g-container .row-space{
  background-color:yellow;
}
.index-wrapper{
}
.scroll-content-wrapper{
  width:100%;
  height:1000px;
  color: var(--van-cell-text-color);
}
.theme-list-choice{
  position:fixed;
  bottom:0;
  right:1rem;
  z-index: 1;
}
.text-container {
  width: 200px; /* 容器宽度 */
  height: 46px; /* 容器高度，确保有两行文本的高度 */
  overflow: hidden; /* 隐藏溢出的内容 */
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 2; /* 限制在一个块元素显示的文本的行数 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  line-clamp: 2; /* 标准属性，但不是所有浏览器都支持 */
  color:var(--van-cell-text-color);
}
</style>