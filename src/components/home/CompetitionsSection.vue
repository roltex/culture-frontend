<template>
  <section class="bg-slate-50">
    <div class="w-full">
      <!-- Main Slider Wrapper -->
      <div class="relative">
        <!-- Skeleton Loading -->
        <div v-if="showSkeleton" class="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-center animate-pulse">
            <div class="flex flex-col justify-center">
                <div class="h-8 w-3/4 bg-slate-200 rounded mb-4"></div>
                <div class="h-12 w-1/2 bg-slate-300 rounded-lg mb-6"></div>
                <div class="space-y-3">
                  <div class="h-4 w-full bg-slate-200 rounded"></div>
                  <div class="h-4 w-5/6 bg-slate-200 rounded"></div>
                  <div class="h-4 w-full bg-slate-200 rounded"></div>
                </div>
                <div class="flex items-center space-x-8 mt-8">
                  <div class="h-10 w-32 bg-slate-200 rounded-lg"></div>
                  <div class="h-10 w-32 bg-slate-200 rounded-lg"></div>
                </div>
            </div>
            <div class="hidden lg:block bg-slate-200 h-[500px]"></div>
        </div>

        <swiper
          v-if="!showSkeleton && competitionsData.length > 0"
          :modules="[Pagination, Autoplay, EffectFade]"
          :space-between="50"
          :effect="'fade'"
          :loop="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :pagination="{
            el: '.swiper-pagination-custom',
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class='${className}'>0${index + 1}</span>`;
            }
          }"
          class="w-full"
        >
          <swiper-slide v-for="competition in competitionsData" :key="competition.id">
            <div class="w-full">
              <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-stretch h-auto lg:h-[700px] bg-slate-50 w-full">
                <!-- Left Column: Competition Details -->
                <div class="flex flex-col justify-center text-left pl-0 lg:px-[20%] h-auto lg:h-full relative">
                  <!-- Section Title positioned at top -->
                  <div class="absolute top-16 left-[20%] right-0 z-10">
                    <div class="relative">
                      <h2 class="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl relative z-10 whitespace-pre-line">
                        {{ t('home.sections.activeCompetitions') }}
                      </h2>
                      <div class="absolute -top-8 -left-4 z-0">
                        <span class="text-7xl lg:text-8xl font-black text-slate-200/80 uppercase" style="letter-spacing: 0.1em;">
                          {{ t('home.competitions.background_text') }}
                        </span>
                      </div>
                      <div class="w-16 h-1 bg-primary mt-4 relative z-20"></div>
                    </div>
                  </div>
                  
                  <h3 class="text-slate-800 text-2xl lg:text-2xl leading-tight mb-4 font-extrabold">
                    {{ getLocalizedContent(competition.title, locale) }}
                  </h3>
                  <div class="flex items-center gap-4 mb-4">
                    <span v-if="competition.prize_amount" class="text-primary text-2xl font-bold bg-primary/10 rounded-full">
                      {{ formatPrize(competition.prize_amount) }}
                    </span>
                    <span :class="competition.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'" class="text-xs font-semibold px-3 py-1 rounded-full">
                      {{ competition.is_active ? t('status.active', 'Active') : t('status.inactive', 'Inactive') }}
                    </span>
                  </div>
                  <p class="text-slate-600 text-base mb-6 leading-relaxed line-clamp-4">
                    {{ getLocalizedContent(competition.excerpt || competition.description, locale) }}
                  </p>
                  <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-8">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8M12 17v4m8-16v2a4 4 0 01-4 4H8a4 4 0 01-4-4V5m16 0a2 2 0 012 2v2a6 6 0 01-6 6H6a6 6 0 01-6-6V7a2 2 0 012-2"/></svg>
                      <span class="text-slate-800 font-medium">{{ competition.category }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 7a4 4 0 110-8 4 4 0 010 8z"/></svg>
                      <span class="text-slate-800 font-medium">{{ competition.max_participants }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12v1a4 4 0 01-8 0v-1M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"/></svg>
                      <span class="text-slate-800 font-medium">{{ competition.contact_email }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.516 2.064A2 2 0 0012.72 8.485l-2.064.516A2 2 0 019.28 10.485l-.516 2.064A2 2 0 007.28 14.485l-2.064.516A2 2 0 013 15.485V17a2 2 0 002 2h3.28a2 2 0 001.94-1.515l.516-2.064A2 2 0 0012.72 15.515l2.064-.516A2 2 0 0014.72 13.515l.516-2.064A2 2 0 0016.72 11.515l2.064-.516A2 2 0 0021 10.515V9a2 2 0 00-2-2h-3.28a2 2 0 00-1.94 1.515l-.516 2.064A2 2 0 0011.28 11.515z"/></svg>
                      <span class="text-slate-800 font-medium">{{ competition.contact_phone }}</span>
                    </div>
                  </div>
                </div>

                <!-- Right Column: Image -->
                <div class="hidden lg:block relative bg-slate-100 h-[300px] lg:h-full overflow-hidden mb-8 lg:mb-0">
                  <img 
                    v-if="competition.featured_image"
                    :src="getImageUrl(competition.featured_image)" 
                    class="w-full h-full object-cover" 
                    :alt="getLocalizedContent(competition.title, locale)"
                  >
                  <div v-else class="w-full h-full bg-gradient-to-br from-primary/10 to-slate-200 flex items-center justify-center">
                    <svg class="w-24 h-24 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <!-- Custom Pagination: below the slider, aligned with left content block -->
        <div v-if="!showSkeleton && competitionsData.length > 0" class="absolute bottom-20 left-[10%] z-10">
          <div class="">
            <div class="swiper-pagination-custom flex items-center gap-4"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useI18n } from 'vue-i18n'
import { useCompetitions, getLocalizedContent } from '@/composables/useCompetitions'
import { getImageUrl } from '@/utils/getImageUrl'

const { t, locale } = useI18n()
const { getActiveCompetitions } = useCompetitions()

const competitions = getActiveCompetitions()
const showSkeleton = computed(() => !competitions.data.value)
const competitionsData = computed(() => competitions.data.value || [])

const formatPrize = (prize: string | number) => {
  const amount = Number(prize);
  if (isNaN(amount)) return ''
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' ₾'
}
</script>

<style>
.swiper-pagination-custom {
  position: static;
}

.swiper-pagination-custom .swiper-pagination-bullet {
  font-size: 1rem;
  font-weight: 500;
  color: #94a3b8; /* slate-400 */
  opacity: 1;
  background: transparent;
  transition: all 0.2s ease-in-out;
  margin: 0 4px;
}

.swiper-pagination-custom .swiper-pagination-bullet-active {
  color: #fff;
  background-color: #0f2340;
  border-radius: 9999px;
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style> 