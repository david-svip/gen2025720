<template>
  <video
    ref="videoRef"
    class="video-js vjs-default-skin"
    controls
    preload="auto"
    width="405"
    height="613"
  ></video>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const videoRef = ref(null)
let player = null

onMounted(() => {
  player = videojs(videoRef.value, {
    autoplay: false,
    controls: true,
    fluid: true,
    html5: {
      vhs: {
        overrideNative: true, // 使用 Video.js VHS ，可支持 DRM
      },
      exts: {
        // ClearKey DRM 配置
        keySystems: {
          'org.w3.clearkey': {
            keys: [
              {
                kty: 'oct',
                alg: 'A128KW',
                kid: '1e8f26e4a5bd3c52be4a4b446adf3021',
                k: '4d3c2b1a78695f4e3d2c1b0fabcdef99'
              }
            ]
          }
        }
      }
    },
    sources: [
      {
        src: 'https://videos.034630.com//voss/trans-free-video/20251201/test/av1/manifest.mpd',
        type: 'application/dash+xml'
      }
    ]
  })

  player.ready(() => {
    console.log('Video.js Ready')
  })
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
  }
})
</script>
