<template>
  <div class="video-container">
    <video
      ref="videoRef"
      controls
      playsinline
      class="video-player"
    ></video>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Hls from 'hls.js';

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  m3u8Url: {
    type: String,
    required: true // 例如："/video/playlist.m3u8?videoId=xxx"
  }
});

const videoRef = ref(null);
const hls = ref(null);
const loading = ref(true);
const error = ref('');

// 解密函数：AES-128-CTR
async function decryptChunk(encryptedData, key, iv) {
  try {
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-CTR' },
      false,
      ['decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-CTR',
        counter: new Uint8Array(iv), // CTR 模式使用 counter
        length: 64 // CTR 计数器位长度（标准是64位）
      },
      cryptoKey,
      encryptedData
    );

    return new Uint8Array(decrypted);
  } catch (err) {
    throw new Error('解密失败: ' + err.message);
  }
}

// 获取密钥 & IV
async function fetchKeyAndIv() {
  try {
    const res = await fetch(`/video/key/${props.videoId}`);
    if (!res.ok) throw new Error('获取密钥失败');

    const { key: keyBase64, iv: ivBase64 } = await res.json();

    console.log(key + '--' + keyBase64,'bbb')
    console.log(iv + '--' + ivBase64,'bbb')

    const key = Uint8Array.from(atob(keyBase64), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));

    return { key, iv };
  } catch (err) {
    throw new Error('密钥加载失败: ' + err.message);
  }
}

// 初始化播放器
async function initPlayer() {
  if (!videoRef.value) return;

  // 检查浏览器支持
  if (!Hls.isSupported()) {
    error.value = '当前浏览器不支持HLS播放';
    return;
  }

  try {
    // 1. 获取解密密钥
    const { key, iv } = await fetchKeyAndIv();

    // 2. 创建 Hls 实例
    hls.value = new Hls({
      enableWorker: false, // 禁用 worker 便于调试和拦截解密
      lowLatencyMode: false
    });

    // 3. 注册自定义解密钩子（核心！）
    hls.value.config.decryptData = async (data, callback) => {
      try {
        const decrypted = await decryptChunk(data, key, iv);
        callback(null, decrypted);
      } catch (err) {
        console.error('解密错误:', err);
        callback(err);
      }
    };

    // 4. 绑定视频元素 & 加载源
    hls.value.attachMedia(videoRef.value);
    hls.value.loadSource(props.m3u8Url);

    // 5. 监听事件
    hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
      loading.value = false;
      videoRef.value.play().catch(e => {
        console.warn('自动播放被阻止:', e);
      });
    });

    hls.value.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        error.value = `播放错误: ${data.type} - ${data.details}`;
        hls.value.destroy();
      }
    });

  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
}

// 生命周期
onMounted(() => {
  initPlayer();
});

onUnmounted(() => {
  if (hls.value) {
    hls.value.destroy();
  }
});
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
}

.video-player {
  width: 100%;
  background: #000;
  border-radius: 8px;
}

.loading, .error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
}

.error {
  color: #ff6b6b;
  background: rgba(255, 0, 0, 0.2);
}
</style>
