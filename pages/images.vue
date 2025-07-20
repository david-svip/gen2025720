<template>
  <div class="page-container">
    <h1>懒加载图片示例</h1>

    <div
      v-for="(src, index) in imageUrls"
      :key="index"
      class="image-container"
      ref="imageContainers"
    >
      <div v-if="loadingStatus[index] === 'loading'" class="loading-placeholder"></div>

      <img
        v-if="loadingStatus[index] !== 'error'"
        :data-src="src"
        alt="懒加载图片"
        class="lazy"
        :class="{ loaded: loadingStatus[index] === 'loaded' }"
        ref="imageElements"
      />

      <div v-if="loadingStatus[index] === 'error'" class="error-fallback">
        加载失败
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'

const imageCount = 20

const imageUrls = Array.from({ length: imageCount }, (_, i) =>
  `https://picsum.photos/id/${200 + i}/700/350`
)

const loadingStatus = ref<( 'loading' | 'loaded' | 'error')[]>(
  Array.from({ length: imageCount }, () => 'loading')
)

const imageElements = ref<HTMLImageElement[]>([])
const imageContainers = ref<HTMLDivElement[]>([])

let observer: IntersectionObserver | null = null

function initObserver() {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const index = imageElements.value.findIndex(el => el === img)
        if (index === -1) return

        if (loadingStatus.value[index] !== 'loading') return

        img.src = img.dataset.src || ''

        img.onload = () => {
          loadingStatus.value[index] = 'loaded'
          observer?.unobserve(img)
        }

        img.onerror = () => {
          loadingStatus.value[index] = 'error'
          observer?.unobserve(img)
        }
      }
    })
  }, { threshold: 0.1 })

  imageElements.value.forEach(img => observer?.observe(img))
}

onMounted(() => {
  nextTick(() => {
    const imgs = document.querySelectorAll<HTMLImageElement>('.lazy')
    imageElements.value = Array.from(imgs)
    initObserver()
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.page-container {
  padding: 30px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.image-container {
  max-width: 700px;
  margin: 30px auto;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

img.lazy {
  width: 100%;
  display: block;
  opacity: 0;
  transition: opacity 1s ease;
  border-radius: 12px;
}

img.lazy.loaded {
  opacity: 1;
}

.loading-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #e0e0e0 25%, #c0c0c0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 12px;
  z-index: 10;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.error-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8d7da;
  color: #721c24;
  font-weight: bold;
  border-radius: 12px;
  z-index: 20;
  font-size: 20px;
  user-select: none;
}
</style>
