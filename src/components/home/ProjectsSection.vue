<template>
  <section class="py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-0 lg:pr-[10%] pl-0">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Carousel -->
        <div class="lg:col-span-2 overflow-hidden relative">
          <!-- Skeleton Loader -->
          <div v-if="showSkeleton" class="flex justify-center items-center h-full">
            <div class="w-full">
              <div class="flex space-x-6 overflow-hidden">
                <div v-for="n in 4" :key="n" class="w-[350px] h-auto flex-shrink-0">
                  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    <div class="h-48 bg-gray-200"></div>
                    <div class="p-6">
                      <div class="flex items-start gap-4 mb-4">
                        <div class="flex-shrink-0">
                          <div class="bg-gray-200 rounded-md px-3 py-2 w-16 h-16"></div>
                        </div>
                        <div class="flex-grow">
                          <div class="h-4 bg-gray-200 rounded mb-2"></div>
                          <div class="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                          <div class="flex gap-4">
                            <div class="h-3 bg-gray-200 rounded w-16"></div>
                            <div class="h-3 bg-gray-200 rounded w-20"></div>
                          </div>
                        </div>
                      </div>
                      <div class="h-4 bg-gray-200 rounded mb-2"></div>
                      <div class="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                      <div class="flex justify-between items-center mt-4">
                        <div class="h-6 w-20 bg-gray-200 rounded"></div>
                        <div class="h-6 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects Slider -->
          <swiper
            v-else-if="projectsData && projectsData.length"
            :modules="[Navigation]"
            :slides-per-view="'auto'"
            :space-between="30"
            :loop="projectsData.length > 1"
            :dir="'rtl'"
            :navigation="{
              prevEl: '.projects-carousel-prev',
              nextEl: '.projects-carousel-next',
            }"
            :breakpoints="{
              '640': { spaceBetween: 20 },
              '1024': { spaceBetween: 30 },
            }"
            class="!overflow-visible"
          >
            <swiper-slide v-for="project in projectsData" :key="project.id" class="!w-[350px] h-auto flex py-4">
              <router-link :to="`/projects/${project.slug}`" class="block h-full group">
                <article class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 w-full h-full">
                  <!-- Project Image -->
                  <div class="relative overflow-hidden">
                    <img 
                      v-if="project.featured_image" 
                      :src="getImageUrl(project.featured_image)" 
                      :alt="getLocalizedContent(project.title)"
                      class="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div v-else class="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                      <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                    </div>
                    <!-- Status Badge -->
                    <div class="absolute top-4 left-4">
                      <span 
                        :class="getStatusClasses(project.status || '')"
                        class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md shadow-sm"
                      >
                        {{ t(`status.${project.status || 'planned'}`) }}
                      </span>
                    </div>
                  </div>

                  <!-- Project Content -->
                  <div class="p-6 text-left">
                    <div class="flex justify-between items-start gap-4 mb-4">
                      <!-- Text Content -->
                      <div class="flex-grow">
                        <h3 class="text-lg font-bold text-slate-800 mb-2 line-clamp-2 leading-tight text-left">
                          {{ getLocalizedContent(project.title) }}
                        </h3>
                      </div>
                      <!-- Date Block -->
                      <div class="flex-shrink-0 text-center">
                        <div class="bg-primary text-white rounded-md px-3 py-2">
                          <p class="text-2xl font-bold leading-none">{{ getFormattedDay(project.start_date) }}</p>
                          <p class="text-xs uppercase tracking-wider">{{ getFormattedMonth(project.start_date) }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Meta Info -->
                    <div class="space-y-2 text-sm text-slate-600">
                      <div class="flex items-center gap-2 flex-row-reverse">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span dir="ltr">{{ formatDate(project.start_date) }} - {{ project.end_date ? formatDate(project.end_date) : t('status.ongoing') }}</span>
                      </div>
                      <div v-if="project.location" class="flex items-center gap-2 flex-row-reverse">
                        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>{{ project.location }}</span>
                      </div>
                    </div>
                    
                    <!-- Excerpt -->
                    <p class="text-sm text-slate-600 my-4 line-clamp-3 leading-relaxed text-left">
                      {{ getLocalizedContent(project.description) }}
                    </p>
                    
                    <!-- Project Meta -->
                    <div class="flex items-center justify-end text-sm pt-4 border-t border-slate-100">
                      <div v-if="project.budget" class="flex items-center gap-2 text-slate-800 font-bold flex-row-reverse">
                        <span dir="ltr">{{ t('message.budget') }}: {{ formatBudget(project.budget) }}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </router-link>
            </swiper-slide>
          </swiper>

          <!-- No Data State -->
          <div v-else-if="!showSkeleton && (!projectsData || projectsData.length === 0)" class="flex justify-center items-center h-full">
            <p class="text-slate-600">No projects available at the moment.</p>
          </div>
        </div>
        
        <!-- Header and Navigation -->
        <div class="lg:col-span-1 relative flex flex-col justify-center items-start lg:items-end text-right lg:text-right pb-10 pl-4 lg:pl-0">
          <div class="relative">
            <h2 class="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl relative z-10 whitespace-pre-line">
              {{ t('home.projects.title') }}
            </h2>
            <div class="absolute -top-8 -right-4 z-0">
              <span class="text-7xl lg:text-8xl font-black text-slate-200/80 uppercase" style="letter-spacing: 0.1em;">
                {{ t('home.projects.background_text', 'PROJECTS') }}
              </span>
            </div>
            <div class="w-16 h-1 bg-primary mt-4 ml-auto"></div>
          </div>
          
          <p class="text-lg text-slate-600 mt-6 max-w-lg">
            {{ t('home.projects.subtitle') }}
          </p>
          
          <div class="mt-8 flex gap-3">
            <button class="projects-carousel-prev w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button class="projects-carousel-next w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <router-link 
              to="/projects" 
              class="group inline-flex items-center gap-2 bg-transparent text-primary border-2 border-primary py-3 px-6 rounded-md font-semibold text-base transition-all duration-300 ease-in-out hover:bg-primary hover:text-white hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span>{{ t('home.projects.view_all') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useProjects } from '@/composables/useProjects'
import { getImageUrl } from '@/utils/getImageUrl'

const { t, locale } = useI18n()
const { getFeaturedProjects } = useProjects()

const projects = getFeaturedProjects()

// Show skeleton when no data is available
const showSkeleton = computed(() => !projects.data.value)

const projectsData = computed(() => projects.data.value || [])

// Helper function for localization
const getLocalizedContent = (content: { ka: string; en: string } | null | undefined, currentLocale: string = locale.value) => {
  if (!content || typeof content !== 'object') {
    return ''
  }
  return content[currentLocale as keyof typeof content] || content.ka || content.en || ''
}

// Format date
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)

  const day = date.getDate()
  const year = date.getFullYear()

  const monthIndex = date.getMonth()
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ]
  const monthKey = `dates.months_short.${monthNames[monthIndex]}`
  const month = t(monthKey)

  if (locale.value === 'ka') {
    return `${day} ${month}, ${year}`
  }
  
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)
  return `${capitalizedMonth} ${day}, ${year}`
}

// Get formatted day for date block
const getFormattedDay = (dateString: string) => {
  if (!dateString) return '--'
  const date = new Date(dateString)
  return date.getDate().toString().padStart(2, '0')
}

// Get formatted month for date block
const getFormattedMonth = (dateString: string) => {
  if (!dateString) return '---'
  const date = new Date(dateString)
  const monthIndex = date.getMonth()
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ]
  const monthKey = `dates.months_short.${monthNames[monthIndex]}`
  return t(monthKey).toUpperCase()
}

// Format budget
const formatBudget = (budget: number) => {
  if (!budget) return ''
  return new Intl.NumberFormat(locale.value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(budget) + ' ₾'
}

// Get status badge classes
const getStatusClasses = (status: string) => {
  const statusClasses = {
    'active': 'bg-emerald-500 text-white',
    'completed': 'bg-blue-500 text-white',
    'pending': 'bg-amber-500 text-white',
    'cancelled': 'bg-red-500 text-white',
    'ongoing': 'bg-emerald-500 text-white',
    'planned': 'bg-primary text-white'
  }
  return statusClasses[status as keyof typeof statusClasses] || 'bg-slate-500 text-white'
}

// Get status icon

</script> 