<template>
  <article class="flex flex-col h-full">
    <!-- Image -->
    <div class="relative overflow-hidden mb-4">
      <router-link :to="`/siakhleebi/${news.slug}`" class="block">
        <img
          :src="getImageUrl(news.featured_image) || '/placeholder-news.jpg'"
          :alt="localizedTitle"
          class="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </router-link>
    </div>

    <!-- Content -->
    <div class="flex-grow flex flex-col">
      <div class="flex items-start gap-4">
        <!-- Date Block -->
        <div class="flex-shrink-0 text-center">
          <div class="bg-primary text-white rounded-md px-3 py-2">
            <p class="text-2xl font-bold leading-none">{{ formattedDay }}</p>
            <p class="text-xs uppercase tracking-wider">{{ formattedMonth }}</p>
          </div>
        </div>

        <!-- Text Content -->
        <div class="flex-grow">
          <h3 class="text-lg font-bold text-slate-800 mb-2 line-clamp-2 leading-tight">
            <router-link :to="`/siakhleebi/${news.slug}`" class="hover:text-primary-dark transition-colors">
              {{ localizedTitle }}
            </router-link>
          </h3>
          <div class="flex items-center gap-4 text-xs text-slate-500 mb-3">
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span>{{ formattedTime }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Excerpt -->
      <p class="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
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

const { locale } = useI18n()

// Computed properties for localized content
const localizedTitle = computed(() => getLocalizedContent(props.news.title, locale.value))
const localizedExcerpt = computed(() => getLocalizedContent(props.news.excerpt, locale.value))

const formattedDay = computed(() => new Date(props.news.published_at).getDate().toString().padStart(2, '0'))

const formattedMonth = computed(() => {
  const date = new Date(props.news.published_at);
  const monthIndex = date.getMonth();
  const monthNames = {
    'ka': ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
    'en': ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };
  return monthNames[locale.value as keyof typeof monthNames]?.[monthIndex] || monthNames.en[monthIndex];
});

const formattedTime = computed(() => {
  const date = new Date(props.news.published_at);
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');
  
  if (locale.value === 'ka') {
    return `${hour}:${minute}`;
  } else {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  }
});

</script> 