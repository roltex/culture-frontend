<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ $t('message.news') }}
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ $t('news.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Skeleton Cards -->
          <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="animate-pulse">
              <div class="h-48 bg-gray-200"></div>
              <div class="p-6">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div class="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="isError" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('message.error') }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ error?.message }}</p>
          <div class="mt-6">
            <button
              @click="() => refetch()"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ t('message.tryAgain') }}
            </button>
          </div>
        </div>
      </div>

      <!-- News Grid -->
      <div v-else-if="data && data.data && data.data.length > 0" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="news in data.data"
            :key="news.id"
            :news="news"
          />
        </div>

        <!-- Pagination -->
        <div v-if="data.meta && data.meta.last_page > 1" class="flex justify-center">
          <nav class="flex items-center space-x-2" aria-label="Pagination">
            <!-- Previous Page -->
            <button
              v-if="data.meta.current_page > 1"
              @click="goToPage(data.meta.current_page - 1)"
              class="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="sr-only">Previous</span>
            </button>

            <!-- Page Numbers -->
            <template v-for="page in getVisiblePages()" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page as number)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md transition-colors cursor-pointer',
                  page === data.meta.current_page
                    ? 'z-10 bg-primary border-primary text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                ]"
              >
                {{ page }}
              </button>
              <span
                v-else
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
              >
                ...
              </span>
            </template>

            <!-- Next Page -->
            <button
              v-if="data.meta.current_page < data.meta.last_page"
              @click="goToPage(data.meta.current_page + 1)"
              class="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="sr-only">Next</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('message.noNews') }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ t('news.noNewsDescription') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import NewsCard from '@/components/news/NewsCard.vue'
import api from '@/services/api'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  const page = route.params.page
  return page ? parseInt(page as string) : 1
})

// Use Vue Query directly for reactive pagination
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['news', currentPage],
  queryFn: async () => {
    const response = await api.get(`/news?page=${currentPage.value}`)
    return response.data
  }
})

const goToPage = (page: number) => {
  // Update the URL
  if (page === 1) {
    router.push({ name: 'News' })
  } else {
    router.push({ name: 'NewsPage', params: { page: page.toString() } })
  }
}

const getVisiblePages = () => {
  if (!data.value?.meta) return []
  
  const { current_page, last_page } = data.value.meta
  const pages: (number | string)[] = []
  
  if (last_page <= 7) {
    // Show all pages if there are 7 or fewer
    for (let i = 1; i <= last_page; i++) {
      pages.push(i)
    }
  } else {
    // Show first page, last page, current page, and pages around current page
    pages.push(1)
    
    if (current_page > 3) {
      pages.push('...')
    }
    
    const start = Math.max(2, current_page - 1)
    const end = Math.min(last_page - 1, current_page + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current_page < last_page - 2) {
      pages.push('...')
    }
    
    if (last_page > 1) {
      pages.push(last_page)
    }
  }
  
  return pages
}
</script> 