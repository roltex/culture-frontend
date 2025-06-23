<template>
  <section class="relative w-full h-[65vh] min-h-[500px] bg-slate-50">
    <div 
      v-if="!newsQuery.isLoading.value && featuredNews.length > 0" 
      class="absolute inset-0"
    >
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        :loop="shouldLoop"
        :autoplay="{
          delay: 6000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
          el: '.swiper-pagination',
        }"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        class="w-full h-full"
      >
        <swiper-slide v-for="news in featuredNews" :key="news.id">
          <div class="flex w-full h-full flex-col-reverse md:flex-row">
            <!-- Image Section -->
            <div class="relative w-full h-1/2 md:w-7/12 md:h-full">
              <img 
                :src="news.featured_image || undefined" 
                :alt="getLocalizedContent(news.title, locale)"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-50 md:bg-gradient-to-l md:from-slate-50"></div>
            </div>
            <!-- Text Section -->
            <div class="w-full h-1/2 bg-slate-50 flex flex-col justify-center items-center text-center md:w-5/12 md:h-full md:items-start md:text-left p-8 lg:p-16 z-10">
              <h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 text-slate-800">
                {{ getLocalizedContent(news.title, locale) }}
              </h2>
              <p class="text-base lg:text-lg leading-relaxed text-slate-600 mb-8 line-clamp-4 max-w-xl">
                {{ getLocalizedContent(news.excerpt, locale) }}
              </p>
              <router-link 
                :to="{ name: 'NewsDetail', params: { slug: getNewsSlug(news) } }"
                class="group inline-flex items-center gap-2 bg-transparent text-primary border-2 border-primary py-3 px-6 rounded-md font-semibold text-base transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span>{{ t('message.readMore', 'Read More') }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </swiper-slide>
        
        <!-- Navigation and Pagination are styled globally below -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>
    
    <!-- Loading State -->
    <div v-if="newsQuery.isLoading.value" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20">
      <div class="w-full h-full">
        <!-- Hero Skeleton -->
        <div class="flex w-full h-full flex-col-reverse md:flex-row">
          <!-- Image Section Skeleton -->
          <div class="relative w-full h-1/2 md:w-7/12 md:h-full">
            <div class="w-full h-full bg-gray-200 animate-pulse"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-50 md:bg-gradient-to-l md:from-slate-50"></div>
          </div>
          <!-- Text Section Skeleton -->
          <div class="w-full h-1/2 bg-slate-50 flex flex-col justify-center items-center text-center md:w-5/12 md:h-full md:items-start md:text-left p-8 lg:p-16 z-10">
            <div class="space-y-4 w-full">
              <!-- Title skeleton -->
              <div class="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div class="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              
              <!-- Excerpt skeleton -->
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              <!-- Button skeleton -->
              <div class="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Error State -->
    <div v-if="newsQuery.isError.value" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20 p-4">
      <p class="text-red-600 mb-4">Unable to load news at this time.</p>
      <button @click="newsQuery.refetch()" class="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-colors">Try Again</button>
    </div>
    <!-- No Data State -->
    <div v-if="!newsQuery.isLoading.value && !newsQuery.isError.value && featuredNews.length === 0" class="absolute inset-0 flex items-center justify-center bg-slate-50 z-20">
      <p class="text-slate-600">No news available at the moment.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNews, getLocalizedContent } from '@/composables/useNews'

const { t, locale } = useI18n()
const { getLatestNews } = useNews()
const newsQuery = getLatestNews()

const modules = [Autoplay, Pagination, Navigation]

// Get featured news (last 5 items)
const featuredNews = computed(() => {
  const news = newsQuery.data.value || []
  // Sort news by creation date in descending order to get the latest ones
  const sortedNews = [...news].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return sortedNews.slice(0, 5);
})

const shouldLoop = computed(() => {
  return featuredNews.value.length > 1
})

const getNewsSlug = (news: any) => {
  if (news.slug) {
    return news.slug
  }
  return news.id.toString()
}
</script>

<!-- 
  Global styles for SwiperJS component customization.
  These styles target the inner elements of the Swiper component,
  which cannot be styled directly with Tailwind classes in the template.
-->
<style>
.swiper-button-prev,
.swiper-button-next {
  color: #1e293b; /* text-slate-800 */
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  color: #143057; /* text-primary */
}

.swiper-pagination {
  bottom: 20px !important;
  text-align: right;
  padding-right: 10%;
}

.swiper-pagination .swiper-pagination-bullet {
  background-color: #94a3b8; /* bg-slate-400 */
  opacity: 1;
}

.swiper-pagination .swiper-pagination-bullet-active {
  background-color: #1e293b; /* bg-slate-800 */
}

@media (max-width: 992px) {
  .swiper-pagination {
    padding-right: 5%;
  }
}

@media (max-width: 768px) {
  .swiper-pagination {
    text-align: center;
    padding-right: 0;
  }
}
</style> 