<template>
  <div class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 sm:py-16 overflow-hidden">
    <!-- Centered Title -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          {{ $t('home.institutions.carousel_title') }}
        </h2>
        <div class="w-16 h-1 bg-primary mt-4 mx-auto"></div>
      </div>
    </div>

    <!-- Full-width Carousel Container -->
    <div class="relative">
      <div v-if="isLoading" class="!px-12 md:!px-20 !py-4">
        <div class="flex space-x-6 overflow-hidden">
          <!-- Skeleton Cards -->
          <div v-for="n in 6" :key="n" class="!w-[200px] md:!w-[220px] flex-shrink-0">
            <div class="flex flex-col h-40 bg-slate-50 rounded-2xl p-4 animate-pulse">
              <div class="flex-grow flex items-center justify-center h-20">
                <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
              <div class="mt-4">
                <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="isError" class="text-center">
        <p class="text-red-500">Could not load institutions.</p>
      </div>
      <swiper
        v-else-if="institutions && institutions.length"
        :modules="[Navigation, Autoplay]"
        :slides-per-view="'auto'"
        :space-between="30"
        :loop="true"
        :centered-slides="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
        class="!px-12 md:!px-20 !py-4"
      >
        <swiper-slide
          v-for="institution in institutions"
          :key="institution.id"
          class="!w-[200px] md:!w-[220px] group"
        >
          <a
            :href="institution.website_url || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col h-40 bg-slate-50 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:bg-white hover:shadow-2xl hover:-translate-y-2 text-center"
          >
            <div class="flex-grow flex items-center justify-center h-20">
              <img
                v-if="institution.logo"
                class="max-h-full max-w-full object-contain filter grayscale transition-all duration-300 ease-in-out group-hover:grayscale-0"
                :src="getLogoUrl(institution.logo)"
                :alt="getLocalizedContent(institution.name, locale)"
                @error="handleImageError"
              />
              <!-- Fallback SVG icon for institutions without logo -->
              <div v-if="!institution.logo" class="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p class="mt-4 text-sm font-semibold text-slate-700 transition-colors group-hover:text-primary flex-shrink-0">
              {{ getLocalizedContent(institution.name, locale) }}
            </p>
          </a>
        </swiper-slide>
      </swiper>

      <!-- Custom Navigation -->
      <div class="swiper-button-prev-custom">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </div>
      <div class="swiper-button-next-custom">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { useSubordinateInstitutions, getLocalizedContent } from '@/composables/useSubordinateInstitutions'
import { getImageUrl } from '@/utils/getImageUrl'

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
  }
}

const { locale } = useI18n()
const { getSubordinateInstitutions } = useSubordinateInstitutions()
const { data: institutions, isLoading, isError } = getSubordinateInstitutions()

const getLogoUrl = (logoPath: string | null) => {
  return getImageUrl(logoPath) || '/logo.png';
}
</script>

<style scoped>
.swiper-button-prev-custom,
.swiper-button-next-custom {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #143057;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  z-index: 10;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
  background-color: #143057;
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.swiper-button-prev-custom {
  left: 2rem;
}

.swiper-button-next-custom {
  right: 2rem;
}

.swiper-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: translateY(-50%) scale(1);
}
</style> 