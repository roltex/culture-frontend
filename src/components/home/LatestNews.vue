<template>
  <div class="bg-slate-50 py-12">
    <div class="mx-auto px-4 sm:px-6 lg:px-0 lg:pl-[10%] pr-0">
      <div class="grid grid-cols-1 lg:grid-cols-3">
        <!-- Header and Navigation -->
        <div class="lg:col-span-1 relative flex flex-col justify-center pb-10">
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl whitespace-pre-line">
              {{ $t('home.latest_news.title') }}
            </h2>
            <div class="w-16 h-1 bg-primary mt-4"></div>
          </div>
          
          <div class="mt-8 flex gap-3">
            <button class="news-carousel-prev w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="news-carousel-next w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <router-link 
              to="/siakhleebi" 
              class="group inline-flex items-center gap-2 bg-transparent text-primary border-2 border-primary py-3 px-6 rounded-md font-semibold text-base transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              {{ $t('home.latest_news.view_all') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Carousel -->
        <div class="lg:col-span-2 overflow-hidden relative">
          <div v-if="isLoading" class="flex justify-center items-center h-full">
            <div class="w-full">
              <div class="flex space-x-6 overflow-hidden">
                <!-- Skeleton Cards -->
                <div v-for="n in 4" :key="n" class="w-[350px] h-auto flex-shrink-0">
                  <div class="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                    <!-- Image skeleton -->
                    <div class="w-full h-48 bg-gray-200"></div>
                    
                    <!-- Content skeleton -->
                    <div class="p-6">
                      <!-- Title skeleton -->
                      <div class="h-5 bg-gray-200 rounded mb-3"></div>
                      <div class="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
                      
                      <!-- Excerpt skeleton -->
                      <div class="space-y-2 mb-4">
                        <div class="h-4 bg-gray-200 rounded"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 rounded w-4/6"></div>
                      </div>
                      
                      <!-- Meta skeleton -->
                      <div class="flex items-center justify-between">
                        <div class="h-4 bg-gray-200 rounded w-24"></div>
                        <div class="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="isError" class="flex justify-center items-center h-full">
            <p class="text-red-500">Could not load news.</p>
          </div>
          <swiper
            v-else-if="newsItems && newsItems.length"
            :modules="[Navigation]"
            :slides-per-view="'auto'"
            :space-between="30"
            :loop="true"
            :navigation="{
              prevEl: '.news-carousel-prev',
              nextEl: '.news-carousel-next',
            }"
            :breakpoints="{
              '640': { spaceBetween: 20 },
              '1024': { spaceBetween: 30 },
            }"
            class="!overflow-visible"
          >
            <swiper-slide v-for="news in newsItems" :key="news.id" class="!w-[350px] h-auto flex">
              <NewsCarouselCard :news="news" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { useNews } from '@/composables/useNews'
import NewsCarouselCard from './NewsCarouselCard.vue'

const { getLatestNews } = useNews()
const { data: allNews, isLoading, isError } = getLatestNews()

const newsItems = computed(() => {
  if (!allNews.value) return []
  // Sort by published_at date in descending order to get the latest news first
  const sortedNews = [...allNews.value].sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  })
  // Return the last 10 news items
  return sortedNews.slice(0, 10)
})
</script> 