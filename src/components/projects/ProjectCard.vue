<template>
  <article class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="project.featured_image || '/placeholder-project.jpg'"
        :alt="localizedTitle"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <!-- Status Badge -->
      <div class="absolute top-3 right-3">
        <span 
          :class="getStatusClasses(project.status)"
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
        >
          <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="statusIcon"></path></svg>
          {{ t(`status.${project.status}`) }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
        {{ localizedTitle }}
      </h3>
      
      <!-- Description -->
      <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {{ localizedDescription }}
      </p>
      
      <!-- Project Dates -->
      <div class="flex items-center justify-between mb-4 text-sm text-gray-500">
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ formatDate(project.start_date) }}</span>
        </div>
        <div v-if="project.end_date" class="flex items-center space-x-1">
          <span>—</span>
          <span>{{ formatDate(project.end_date) }}</span>
        </div>
      </div>
      
      <!-- Progress Bar for Ongoing Projects -->
      <div v-if="project.status === 'ongoing'" class="mb-4">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <span>{{ t('status.ongoing') }}</span>
          <span>75%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-green-500 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Featured Badge -->
          <span v-if="project.is_featured" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </span>
        </div>
        
        <!-- View Details Button -->
        <router-link
          :to="`/projects/${project.slug}`"
          class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
        >
          {{ t('message.readMore') }}
          <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { Project } from '@/composables/useProjects'
import { getLocalizedContent } from '@/composables/useProjects'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const { t, locale } = useI18n()

// Computed properties for localized content
const localizedTitle = computed(() => getLocalizedContent(props.project.title, locale.value))
const localizedDescription = computed(() => getLocalizedContent(props.project.description, locale.value))

const statusIcon = computed(() => {
  switch (props.project.status) {
    case 'planned':
      return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    case 'ongoing':
      return 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m-3.182 0l-3.182-3.182a8.25 8.25 0 00-11.667 0L2.985 15.644z'
    case 'completed':
      return 'M5 13l4 4L19 7'
    default:
      return ''
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'short'
  })
}

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'planned':
      return 'bg-blue-100 text-blue-800'
    case 'ongoing':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
