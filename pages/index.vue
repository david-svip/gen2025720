<template>
  <div class="index-wrapper">
    <ul>
      <li v-for="link of linkList">
        <a :href="link.url">{{link.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const linkList = [
  {
    url:'/images',
    name:'懒加载'
  },
  {
    url:'/server-side-render',
    name:'服务器端渲染与皮肤替换'
  },
  {
    url:'/pc',
    name:'PC'
  },
  {
    url:'/file-test',
    name:'m3u8'
  },
  {
    url:'/20/18',
    name:'动态参数路由'
  },
  {
    url:'/dynamic-offset',
    name:'标签动态偏移'
  },
  {
    url:'/ai-game',
    name:'测试ai生成代码'
  }
];
</script>

<style>
.index-wrapper{
  padding:20px 0 0 20px;
}
.index-wrapper ul li{
  padding-bottom:10px;
  cursor: pointer;
}
</style>