<template>
  <router-link :to="`/proeqtebi/${project.slug}`" class="block">
    <article class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="getImageUrl(project.featured_image) || '/placeholder-project.jpg'"
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
    </div>
  </article>
  </router-link>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { Project } from '@/composables/useProjects'
import { getLocalizedContent } from '@/composables/useProjects'
import { getImageUrl } from '@/utils/getImageUrl'

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
