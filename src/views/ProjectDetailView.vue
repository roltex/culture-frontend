<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="bg-gray-50 min-h-screen">
      <!-- Compact Header Section Skeleton -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="max-w-4xl">
            <!-- Title skeleton -->
            <div class="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <!-- Meta skeleton -->
            <div class="flex items-center space-x-4">
              <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area Skeleton -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Project Content Skeleton -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Image Carousel Skeleton -->
            <div class="mb-8 pb-6 border-b border-gray-200">
              <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            
            <!-- Content paragraphs skeleton -->
            <div class="space-y-6">
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
              
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
            
            <!-- Project Meta Information Skeleton -->
            <div class="mt-10 pt-6 border-t border-gray-200">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar Skeleton -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <div class="h-8 bg-gray-200 rounded w-32 mx-6 mt-6 mb-4 animate-pulse"></div>
              <div class="divide-y divide-gray-200">
                <!-- Related projects items skeleton -->
                <div v-for="n in 3" :key="n" class="flex items-start space-x-4 p-6">
                  <div class="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 animate-pulse"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="flex justify-center items-center h-screen">
      <div class="text-center max-w-md mx-auto">
        <h3 class="text-2xl font-semibold text-gray-800">{{ t('message.error') }}</h3>
        <p class="mt-2 text-gray-600">{{ error?.message }}</p>
        <div class="mt-8">
          <router-link
            to="/proeqtebi"
            class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {{ t('message.viewAll') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Project Page Layout -->
    <div v-else-if="project">
      <!-- Compact Header Section -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="max-w-4xl">
            <h1 class="text-xl md:text-2xl font-semibold text-gray-900 leading-tight mb-2">
              {{ localizedTitle }}
            </h1>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formattedStartDate }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span>—</span>
                <span>{{ formattedEndDate || t('status.ongoing') }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span :class="getStatusClasses(project.status)" class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md">
                  {{ t(`status.${project.status}`) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Project Content -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Image Carousel -->
            <div v-if="carouselImages.length > 0" class="mb-8 pb-6 border-b border-gray-200">
              <ImageCarousel 
                :images="carouselImages" 
                :title="localizedTitle"
              />
            </div>
            
            <div class="prose prose-lg max-w-none" v-html="localizedContent"></div>
            
            <!-- Attachments -->
            <AttachmentViewer :attachments="project.attachments" />
            
            <!-- Project Meta Information -->
            <div class="mt-10 pt-6 border-t border-gray-200">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-if="project.location" class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="text-gray-600">{{ project.location }}</span>
                </div>
                <div v-if="project.budget" class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  <span class="text-gray-600">{{ t('message.budget') }}: {{ formatBudget(project.budget) }}</span>
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 px-6 pt-6 pb-4">{{ t('projects.otherProjects') }}</h3>
              <ul v-if="relatedProjects.length" class="divide-y divide-gray-200">
                <li v-for="related in relatedProjects" :key="related.id" class="group">
                  <router-link :to="`/proeqtebi/${related.slug}`" class="flex items-start space-x-4 p-6 hover:bg-gray-50 transition-colors">
                    <img :src="getImageUrl(related.featured_image) || '/placeholder-project.jpg'" :alt="getLocalizedContent(related.title, locale)" class="w-20 h-20 rounded-lg object-cover flex-shrink-0">
                    <div class="flex-1">
                      <p class="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {{ getLocalizedContent(related.title, locale) }}
                      </p>
                      <p class="text-sm text-gray-600 mt-2 line-clamp-2">
                        {{ getLocalizedContent(related.description, locale) }}
                      </p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProjects, getLocalizedContent } from '@/composables/useProjects'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatEventDate } from '@/utils/dateUtils'
import ImageCarousel from '@/components/common/ImageCarousel.vue'
import AttachmentViewer from '@/components/common/AttachmentViewer.vue'

const { t, locale } = useI18n()
const route = useRoute()
const { getProjectBySlug, getFeaturedProjects } = useProjects()

const slug = computed(() => route.params.slug as string)

// Get project data
const { 
  isLoading, 
  isError, 
  data: project, 
  error 
} = getProjectBySlug(slug)

// Get related projects
const relatedProjectsQuery = getFeaturedProjects()
const relatedProjects = computed(() => {
  const projects = relatedProjectsQuery.data.value || []
  return projects.filter(p => p.slug !== slug.value).slice(0, 3)
})

// Carousel images for the component
const carouselImages = computed(() => {
  const images = []
  if (project.value?.featured_image) {
    const featuredUrl = getImageUrl(project.value.featured_image)
    images.push(featuredUrl)
  }
  if (project.value?.gallery) {
    const galleryUrls = project.value.gallery.map(img => getImageUrl(img))
    images.push(...galleryUrls)
  }
  return images
})

// Computed properties for localized content
const localizedTitle = computed(() => {
  const title = project.value?.title
  return title ? getLocalizedContent(title, locale.value) : ''
})
const localizedContent = computed(() => {
  const content = project.value?.content
  return content ? getLocalizedContent(content, locale.value) : ''
})

const formattedStartDate = computed(() => {
  if (!project.value?.start_date) return ''
  return formatEventDate(project.value.start_date, locale.value)
})
const formattedEndDate = computed(() => {
  if (!project.value?.end_date) return ''
  return formatEventDate(project.value.end_date, locale.value)
})

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


</script> 