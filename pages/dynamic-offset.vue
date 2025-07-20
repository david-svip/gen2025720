<template>
  <div class="dynamic-offset" @scroll="wrapperScroll" ref="滚动容器">
    <div class="nav-container" :class="{'is-sticky':isNavSticky}" 
      :style="{'margin-top':`${navTop}px`}">
      <div :class="{current:i == currNavIndex}" 
        v-for="(nav,i) of navItemList" @click="navItemClick(i)">
        {{ nav }}
      </div>
    </div>
    <div class="page-content">
      <div v-for="(nu,index) of totalList" class="item-container">
        <div class="no">{{ index }}</div><div>{{ nu }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const testFixedSpace = 100;
const navTop = ref(200);
const scrollTop = ref(0);
const navItemList = ref([
  '首页',
  '分类1',
  '分类2',
  '分类3',
  '分类4',
  '分类5',
  '分类6',
  '分类7',
  '分类8',
  '0000'
]);
const currNavIndex = ref(0);
const isNavSticky = ref(false);
const siglePageSpace = 600;

const wrapperScroll = (ev) => {
  scrollTop.value = ev.target.scrollTop;
  isNavSticky.value = scrollTop.value > (navTop.value - testFixedSpace);

  let lastIndex = navItemList.value.length - 1;
  navItemList.value[lastIndex] = (''+scrollTop.value).padStart(4,'0')
  
  currNavIndex.value = Math.floor(scrollTop.value / siglePageSpace);
  if(currNavIndex.value > navItemList.value.length - 1){
    currNavIndex.value = navItemList.value.length - 1;
  }
}
const totalList = ref([]);
for(let i = 0; i < 125; i++){
  totalList.value.push('减肥i哦收费无法离开据了解，带上飞机上来看快乐瞬间埃里克看来是圣诞快乐快乐')
}
const 滚动容器 = ref(null)
const navItemClick = i => {
  currNavIndex.value = i;
  滚动容器.value.scrollTo({ top: i * siglePageSpace, behavior: 'smooth' });
}
</script>

<style scoped lang="stylus">
.dynamic-offset{
  width:100%;
  height:calc(100% - 1px);
  overflow-y:auto;
  border-top:1px solid transparent;

  .page-content{
    width:100%;
    height:auto;
    .item-container{
      padding:16px;
      display:flex;
      .no{
        margin-right:10px;
      }
    }
  }
  .nav-container{
    width:90%;
    height:40px;
    margin-top:50px;
    background:gray;
    color:white;
    display:flex;
    justify-content:space-around;
    align-items:center;
    &.is-sticky{
      position:sticky;
      top:120px;
    }
    & > div{
      cursor:pointer;
      padding:0 10px;
      transition:all .6s;
      &:last-child{
        width:40px;
      }
    }
    .current{
      box-shadow:0 0 3px 0 rgba(0,0,0,1) inset;
      background: #ff9e19;
      color: #000000;
      font-weight:bold;
    }
  }
}
</style>