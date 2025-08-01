<template>
  <div v-if="images.length > 0" class="relative">
    <!-- Main Carousel Container -->
    <div class="overflow-hidden rounded-xl bg-gray-50">
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        :style="transformStyle"
      >
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="w-full flex-shrink-0 min-w-full"
        >
          <div class="w-full h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden cursor-pointer" @click="openLightbox(image, index)">
            <img 
              :src="image" 
              :alt="`${title} - Image ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              @error="handleImageError($event, image, index)"
              @load="handleImageLoad(image, index)"
            >
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation Arrows -->
    <button 
      v-if="images.length > 1"
      @click="previousSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      v-if="images.length > 1"
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    
    <!-- Dots Indicator -->
    <div v-if="images.length > 1" class="flex justify-center mt-4 space-x-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all duration-200"
        :class="currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'"
      ></button>
    </div>
    
    <!-- Image Counter -->
    <div v-if="images.length > 1" class="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
      {{ currentSlide + 1 }} / {{ images.length }}
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
                {{ currentLightboxIndex + 1 }} of {{ images.length }}
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
          v-if="currentLightboxIndex > 0"
          @click.stop="previousImage"
          class="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
          title="Previous image"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          v-if="currentLightboxIndex < images.length - 1"
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
              :src="currentLightboxImage"
              :alt="`Gallery image ${currentLightboxIndex + 1}`"
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
                  'ring-2 ring-white ring-offset-2 ring-offset-black/50': index === currentLightboxIndex,
                  'opacity-60 hover:opacity-100': index !== currentLightboxIndex
                }"
                @click.stop="currentLightboxIndex = index"
              >
                <img
                  :src="image"
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  images: string[]
  title?: string
  autoplay?: boolean
  autoplayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  autoplay: false,
  autoplayInterval: 5000
})

// Carousel state
const currentSlide = ref(0)
const lightboxOpen = ref(false)
const currentLightboxIndex = ref(0)
const imageLoading = ref(false)
let autoplayTimer: number | null = null

const transformStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`
}))

const currentLightboxImage = computed(() => props.images[currentLightboxIndex.value])

// Carousel navigation
const nextSlide = () => {
  if (currentSlide.value < props.images.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = props.images.length - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Lightbox functionality
const openLightbox = (image: string, index: number) => {
  currentLightboxIndex.value = index
  lightboxOpen.value = true
  imageLoading.value = true
  document.body.style.overflow = 'hidden'
  stopAutoplay()
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
  if (props.autoplay) {
    startAutoplay()
  }
}

const onImageLoad = () => {
  imageLoading.value = false
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = currentLightboxImage.value
  link.download = `gallery-image-${currentLightboxIndex.value + 1}.jpg`
  link.click()
}

const nextImage = () => {
  if (currentLightboxIndex.value < props.images.length - 1) {
    imageLoading.value = true
    currentLightboxIndex.value++
  } else {
    imageLoading.value = true
    currentLightboxIndex.value = 0
  }
}

const previousImage = () => {
  if (currentLightboxIndex.value > 0) {
    imageLoading.value = true
    currentLightboxIndex.value--
  } else {
    imageLoading.value = true
    currentLightboxIndex.value = props.images.length - 1
  }
}

// Autoplay functionality
const startAutoplay = () => {
  if (props.autoplay && props.images.length > 1) {
    autoplayTimer = window.setInterval(() => {
      nextSlide()
    }, props.autoplayInterval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// Image loading handlers
const handleImageError = (event: Event, imageUrl: string, index: number) => {
  console.error(`Failed to load image ${index + 1}:`, imageUrl)
}

const handleImageLoad = (imageUrl: string, index: number) => {
  // Image loaded successfully
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (lightboxOpen.value) {
    switch (event.key) {
      case 'ArrowLeft':
        previousImage()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'Escape':
        closeLightbox()
        break
    }
  } else {
    switch (event.key) {
      case 'ArrowLeft':
        previousSlide()
        break
      case 'ArrowRight':
        nextSlide()
        break
    }
  }
}

// Watch for image changes to show loading
watch(currentLightboxIndex, () => {
  if (lightboxOpen.value) {
    imageLoading.value = true
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  if (props.autoplay) {
    startAutoplay()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  stopAutoplay()
  // Reset body overflow in case component unmounts while lightbox is open
  document.body.style.overflow = 'auto'
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