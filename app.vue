<template>
  <van-config-provider :theme="defineTheme">
    <NuxtLayout class="main-layout-wrapper">
      <NuxtPage />
    </NuxtLayout>
  </van-config-provider>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import 'vant/lib/index.css'
import { storeToRefs } from 'pinia'
import {useGlobalStore} from './stores/globalStore'

const globalStor = useGlobalStore()
globalStor.getHomeJsonAction()
const {
  appConfig,
  appData,
  curAdvDomain,
  vantTheme,
  defineTheme,
  webSiteId,
  tenantId,
  clklog,
  videoImageList,
  curVideoImageDomain,
  tabNavItem,
  refName
}: any = storeToRefs(globalStor)

</script>

<style>
.main-layout-wrapper{
  width:100%;
  min-height:100vh;
  background-color:var(--van-background-2)
}
</style>