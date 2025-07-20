<template>
  <div class="layout-container">
    <!--
    <div class="bg-girl">
      <img class="girl" src="file:///Users/test/Downloads/women7.jpg" />
      <div class="g-cover"></div>
    </div>
    -->
    <div class="layout-header">
      <div>
        <span>这是一个布局头部</span>
        <span @click="goDataPage">跳转数据页</span>
      </div>
    </div>
    <div class="page-child-wrapper" :class="{'is-padding-wrapp':isPadding}">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router'
const route = useRoute();
const router = useRouter();

const goDataPage = () => {
  router.push('/20/10')
}
const isPadding = ref(true);
isPadding.value = route.path != '/dynamic-offset';

onMounted(() => {
  let full = false;
  window.addEventListener('keydown',code => {
    if(code.key == 'f'){
      if(full){
        full = false;
        document.exitFullscreen();
      }else{
        document.documentElement.requestFullscreen();
        full = true;
      }
    }
  })
})

</script>

<style lang="stylus">
.layout-container{
  width:100vw;
  height:100vh;
  position:relative;
}
.page-child-wrapper{
  width:100%;
  height:100%;
  &.is-padding-wrapp{
    padding-top:100px;
  }
}
.bg-girl{
  width:100%;
  height:100%;
  position:absolute;
  z-index:100;
  top:0;
  left:0;
  background-color:rgba(40, 50, 55,1);
}
.girl{
  width:66%;
  height:auto;
  margin:266px 0 0 20px;
}
.g-cover{
  width:100%;
  height:100%;
  z-index: 101;
  background-color:rgba(40, 50, 55,.2);
  position: absolute;
  top:0;
  left:0;
  color:pink;
}
.layout-header{
  width:100%;
  height:100px;
  color: var(--van-cell-text-color);
  display:flex;
  align-items: center;
  padding-left:10px;
  position:fixed;
  z-index:4;
  background-image: radial-gradient(transparent 1px, var(--van-background-2) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  left:0;
  top:0;
  box-shadow: 0 0 5px 0 var(--van-cell-text-color);
}
</style>