<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="bg-gray-50 min-h-screen">
      <!-- Hero Section Skeleton -->
      <div class="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
        <div class="absolute inset-0 bg-gray-700"></div>
        <div class="relative max-w-5xl mx-auto text-center">
          <!-- Title skeleton -->
          <div class="space-y-4">
            <div class="h-12 bg-gray-600 rounded mx-auto max-w-4xl animate-pulse"></div>
            <div class="h-12 bg-gray-600 rounded mx-auto max-w-3xl animate-pulse"></div>
            <div class="h-12 bg-gray-600 rounded mx-auto max-w-2xl animate-pulse"></div>
          </div>
          
          <!-- Meta skeleton -->
          <div class="mt-6 flex items-center justify-center space-x-4">
            <div class="h-6 bg-gray-600 rounded w-32 animate-pulse"></div>
            <div class="text-gray-500">&bull;</div>
            <div class="h-6 bg-gray-600 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Main Content Area Skeleton -->
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          
          <!-- Article Content Skeleton -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <div class="space-y-6">
              <!-- Content paragraphs -->
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
              
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
            
            <!-- Social Share Skeleton -->
            <div class="mt-10 pt-6 border-t border-gray-200">
              <div class="h-6 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
              <div class="flex items-center space-x-4">
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </article>

          <!-- Sidebar Skeleton -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <div class="h-8 bg-gray-200 rounded w-32 mx-6 mt-6 mb-4 animate-pulse"></div>
              <div class="divide-y divide-gray-200">
                <!-- Related news items skeleton -->
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
            to="/news"
            class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {{ t('news.backToNews') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Article Page Layout -->
    <div v-else-if="article">
      <!-- Hero Section -->
      <div class="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
        <div class="absolute inset-0 overflow-hidden">
          <img :src="article.featured_image || '/placeholder-news.jpg'" :alt="localizedTitle" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
        <div class="relative max-w-5xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {{ localizedTitle }}
          </h1>
          <div class="mt-6 text-lg text-gray-300 flex items-center justify-center space-x-4">
            <span>{{ formattedDate }}</span>
            <span class="text-gray-500">&bull;</span>
             <div class="flex items-center space-x-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{{ article.views_count }} {{ t('news.views') }}</span>
              </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          
          <!-- Article Content -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <div class="prose prose-lg max-w-none" v-html="localizedContent"></div>
            
            <!-- Social Share -->
            <div class="mt-10 pt-6 border-t border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ t('news.share') }}</h3>
              <div class="flex items-center space-x-4">
                <button @click="shareOnFacebook" title="Share on Facebook" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button @click="shareOnTwitter" title="Share on Twitter" class="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                 <button @click="shareOnLinkedIn" title="Share on LinkedIn" class="text-gray-400 hover:text-blue-700 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </button>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 px-6 pt-6 pb-4">{{ t('news.otherNews') }}</h3>
              <ul v-if="relatedNews.length" class="divide-y divide-gray-200">
                <li v-for="related in relatedNews" :key="related.id" class="group">
                  <router-link :to="`/news/${related.slug}`" class="flex items-start space-x-4 p-6 hover:bg-gray-50 transition-colors">
                    <img :src="related.featured_image || '/placeholder-news.jpg'" :alt="getLocalizedContent(related.title, locale)" class="w-20 h-20 rounded-lg object-cover flex-shrink-0">
                    <div class="flex-1">
                      <p class="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {{ getLocalizedContent(related.title, locale) }}
                      </p>
                      <p class="text-sm text-gray-600 mt-2 line-clamp-2">
                        {{ getLocalizedContent(related.excerpt, locale) }}
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
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNews, getLocalizedContent, type News } from '@/composables/useNews'

const { t, locale } = useI18n()
const route = useRoute()
const { getNewsBySlug, getLatestNews } = useNews()

const slug = computed(() => route.params.slug as string)

// Debug info
console.log('Current slug:', slug.value)

const { 
  isLoading, 
  isError, 
  data: article, 
  error 
} = getNewsBySlug(slug)

// Debug info
console.log('Article loading:', isLoading.value)
console.log('Article error:', isError.value)
console.log('Article data:', article.value)

const { data: allNews } = getLatestNews()
const relatedNews = ref<News[]>([])

const shareUrl = computed(() => window.location.href)
const shareTitle = computed(() => localizedTitle.value)

const shareOnFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`, '_blank', 'noopener,noreferrer')
}
const shareOnTwitter = () => {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(shareTitle.value)}`, '_blank', 'noopener,noreferrer')
}
const shareOnLinkedIn = () => {
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(shareTitle.value)}`, '_blank', 'noopener,noreferrer')
}

watchEffect(() => {
  if (allNews.value && article.value) {
    relatedNews.value = allNews.value
      .filter((item: News) => item.id !== article.value?.id)
      .slice(0, 5)
  }
})

const localizedTitle = computed(() => article.value ? getLocalizedContent(article.value.title, locale.value) : '')
const localizedContent = computed(() => article.value ? getLocalizedContent(article.value.content, locale.value) : '')

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  const monthKeys = [
    'dates.months.january', 'dates.months.february', 'dates.months.march',
    'dates.months.april', 'dates.months.may', 'dates.months.june',
    'dates.months.july', 'dates.months.august', 'dates.months.september',
    'dates.months.october', 'dates.months.november', 'dates.months.december'
  ]

  const monthName = t(monthKeys[monthIndex])

  if (locale.value === 'ka') {
    return `${day} ${monthName}, ${year}`
  }
  
  return `${monthName} ${day}, ${year}`
}

const formattedDate = computed(() => {
  if (!article.value) return ''
  return formatDate(article.value.published_at)
})
</script>

<style>
.prose {
  color: #374151;
}
.prose h1, .prose h2, .prose h3 {
  color: #111827;
}
.prose a {
  color: #2563eb;
}
.prose strong {
  color: #111827;
}
</style> 