<template>
  <router-link :to="`/kalendari/${calendar.slug}`" class="block">
    <article class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
      <!-- Image -->
      <div class="relative h-48 overflow-hidden">
        <img
          :src="getImageUrl(calendar.featured_image) || '/placeholder-event.jpg'"
          :alt="localizedTitle"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <!-- Event Date Badge -->
        <div class="absolute top-3 right-3">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800">
            <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {{ formatEventDateLocalized(calendar.event_date, locale, 'short') }}
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
          {{ localizedExcerpt }}
        </p>

        <!-- Event Time -->
        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ formatEventTime(calendar.event_date, locale) }}
        </div>
      </div>
    </article>
  </router-link>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { Calendar } from '@/composables/useCalendars'
import { getLocalizedContent } from '@/composables/useCalendars'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatEventDate, formatEventTime } from '@/utils/dateUtils'
import { formatEventDateLocalized } from '@/utils/dateUtils'

interface Props {
  calendar: Calendar
}

const props = defineProps<Props>()

const { t, locale } = useI18n()

// Computed properties for localized content
const localizedTitle = computed(() => getLocalizedContent(props.calendar.title, locale.value))
const localizedExcerpt = computed(() => getLocalizedContent(props.calendar.excerpt, locale.value))


</script> 