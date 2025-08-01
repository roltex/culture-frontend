<template>
  <div v-if="images && images.length > 0" class="gallery-container">
    <!-- Gallery Layout: Featured + Grid -->
    <div class="space-y-6">
      <!-- Main Featured Image -->
      <div 
        v-if="images.length > 0"
        class="relative aspect-[16/10] overflow-hidden rounded-2xl cursor-pointer group bg-gray-100"
        @click="openLightbox(0)"
      >
        <img
          :src="getImageUrl(images[0])"
          :alt="`Gallery featured image`"
          class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-6 left-6 text-white">
            <div class="flex items-center space-x-2 text-sm font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ images.length }} {{ images.length === 1 ? 'photo' : 'photos' }}</span>
            </div>
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Thumbnail Grid (if more than 1 image) -->
      <div v-if="images.length > 1" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        <div
          v-for="(image, index) in images.slice(1, 8)"
          :key="index + 1"
          class="relative aspect-square overflow-hidden rounded-xl cursor-pointer group bg-gray-100"
          @click="openLightbox(index + 1)"
        >
          <img
            :src="getImageUrl(image)"
            :alt="`Gallery thumbnail ${index + 2}`"
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl"></div>
          <!-- Show count on last thumbnail if more images exist -->
          <div 
            v-if="index === 6 && images.length > 8" 
            class="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl"
          >
            <span class="text-white font-semibold text-sm">+{{ images.length - 8 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        @click="closeLightbox"
      >
        <!-- Header Bar -->
        <div class="absolute top-0 left-0 right-0 z-60 bg-gradient-to-b from-black/50 to-transparent p-6">
          <div class="flex items-center justify-between text-white">
            <div class="flex items-center space-x-4">
              <h3 class="text-lg font-semibold">{{ title || 'Gallery' }}</h3>
              <div class="text-sm text-gray-300">
                {{ currentImageIndex + 1 }} of {{ images.length }}
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <!-- Download Button -->
              <button
                @click.stop="downloadImage"
                class="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Download image"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <!-- Close Button -->
              <button
                @click="closeLightbox"
                class="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Close gallery"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          v-if="currentImageIndex > 0"
          @click.stop="previousImage"
          class="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
          title="Previous image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          v-if="currentImageIndex < images.length - 1"
          @click.stop="nextImage"
          class="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
          title="Next image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Main Image Container -->
        <div class="flex items-center justify-center h-full px-20 py-20" @click.stop>
          <div class="relative max-w-7xl max-h-full">
            <img
              :src="getImageUrl(images[currentImageIndex])"
              :alt="`Gallery image ${currentImageIndex + 1}`"
              class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              @load="onImageLoad"
            />
            <!-- Loading indicator -->
            <div v-if="imageLoading" class="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
              <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        <!-- Bottom Thumbnail Strip -->
        <div class="absolute bottom-0 left-0 right-0 z-60 bg-gradient-to-t from-black/50 to-transparent p-6">
          <div class="flex justify-center">
            <div class="flex space-x-2 max-w-4xl overflow-x-auto scrollbar-hide">
              <div
                v-for="(image, index) in images"
                :key="index"
                class="flex-shrink-0 w-16 h-16 rounded-lg cursor-pointer overflow-hidden transition-all duration-200"
                :class="{ 
                  'ring-2 ring-white ring-offset-2 ring-offset-black/50': index === currentImageIndex,
                  'opacity-60 hover:opacity-100': index !== currentImageIndex
                }"
                @click.stop="currentImageIndex = index"
              >
                <img
                  :src="getImageUrl(image)"
                  :alt="`Thumbnail ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { getImageUrl } from '@/utils/getImageUrl'

interface Props {
  images: string[]
  title?: string
}

const props = defineProps<Props>()

const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const imageLoading = ref(false)

const openLightbox = (index: number) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
  imageLoading.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < props.images.length - 1) {
    imageLoading.value = true
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    imageLoading.value = true
    currentImageIndex.value--
  }
}

const onImageLoad = () => {
  imageLoading.value = false
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = getImageUrl(props.images[currentImageIndex.value])
  link.download = `gallery-image-${currentImageIndex.value + 1}.jpg`
  link.click()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  
  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// Watch for image changes to show loading
watch(currentImageIndex, () => {
  if (lightboxOpen.value) {
    imageLoading.value = true
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style> 