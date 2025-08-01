<template>
  <article class="flex flex-col h-full bg-white rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
    <!-- Image -->
    <div class="relative overflow-hidden rounded-t-lg">
      <router-link :to="`/siakhleebi/${news.slug}`" class="block h-64 bg-slate-100">
        <img
          :src="getImageUrl(news.featured_image) || '/placeholder-news.jpg'"
          :alt="localizedTitle"
          class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </router-link>
    </div>

    <!-- Content -->
    <div class="p-6 flex-grow flex flex-col">
      <div class="flex items-start gap-4">
        <!-- Date Block -->
        <div class="flex-shrink-0 text-center">
          <div class="bg-primary text-white rounded-md w-16 py-2">
            <p class="text-2xl font-bold leading-none">{{ formattedDay }}</p>
            <p class="text-xs uppercase tracking-wider font-semibold">{{ formattedMonth }}</p>
          </div>
        </div>

        <!-- Text Content -->
        <div class="flex-grow">
          <h3 class="text-lg font-bold text-slate-800 mb-2 line-clamp-2 leading-tight">
            <router-link :to="`/siakhleebi/${news.slug}`" class="hover:text-primary-dark transition-colors">
              {{ localizedTitle }}
            </router-link>
          </h3>
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            <span>{{ formattedTime }}</span>
          </div>
        </div>
      </div>
      
      <!-- Excerpt -->
      <p class="text-sm text-gray-600 mt-4 line-clamp-3 leading-relaxed flex-grow">
        {{ localizedExcerpt }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { News } from '@/composables/useNews'
import { getLocalizedContent } from '@/composables/useNews'
import { getImageUrl } from '@/utils/getImageUrl'

interface Props {
  news: News
}

const props = defineProps<Props>()
const { t, locale } = useI18n()

const localizedTitle = computed(() => getLocalizedContent(props.news.title, locale.value))
const localizedExcerpt = computed(() => getLocalizedContent(props.news.excerpt, locale.value))
const formattedDay = computed(() => new Date(props.news.published_at).getDate().toString().padStart(2, '0'))

const formattedMonth = computed(() => {
  const date = new Date(props.news.published_at)
  const monthIndex = date.getMonth()
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june', 
    'july', 'august', 'september', 'october', 'november', 'december'
  ]
  const monthKey = `dates.months_short.${monthNames[monthIndex]}`
  return t(monthKey).toUpperCase()
})

const formattedTime = computed(() => new Date(props.news.published_at).toLocaleTimeString(locale.value, { hour: 'numeric', minute: '2-digit', hour12: true }))
</script>

<style scoped>
/* Tailwind's line-clamp plugin handles this, but it's here for safety */
.line-clamp-2, .line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 { 
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
.line-clamp-3 {
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>