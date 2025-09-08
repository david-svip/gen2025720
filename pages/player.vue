<template>
  <EncryptedVideoPlayer
    video-id="movie123"
    m3u8-url="/video/playlist.m3u8?videoId=movie123"
  />
</template>

<script setup>
import EncryptedVideoPlayer from '@/components/video-decrypto/EncryptedVideoPlayer.vue';
</script>

