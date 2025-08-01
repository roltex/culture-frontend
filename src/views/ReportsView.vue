<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="animate-pulse">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div class="divide-y divide-gray-200">
            <div v-for="n in 5" :key="n" class="px-6 py-4">
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                <div class="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="isError" class="text-center">
        <div class="text-red-600 text-lg mb-4">{{ t('common.error') }}</div>
        <p class="text-gray-600 mb-8">{{ error?.message }}</p>
        <button @click="() => refetch()" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          {{ t('common.tryAgain') }}
        </button>
      </div>

      <!-- Reports Table -->
      <div v-else-if="reportsData && reportsData.length > 0" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ t('reports.title') }} ({{ reportsData.length }})
          </h2>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('reports.details') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('reports.publishedDate') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('reports.attachments') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('common.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="report in reportsData" :key="report.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-medium text-gray-900 mb-1">
                      {{ getReportLocalizedContent(report, 'title') }}
                    </h3>
                    <p class="text-sm text-gray-600 line-clamp-2">
                      {{ getShortDescription(report) }}
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatPublishedDate(report.published_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span v-if="report.attachments && report.attachments.length > 0" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ report.attachments.length }} {{ t('reports.attachments') }}
                  </span>
                  <span v-else class="text-gray-400">
                    {{ t('common.noData') }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <router-link 
                    :to="`/angarishebi/${report.slug}`"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    {{ t('common.read_more') }}
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="reportsData && reportsData.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button 
                v-if="currentPage > 1"
                @click="goToPage(currentPage - 1)"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {{ t('common.previous') }}
              </button>
              <button 
                v-if="currentPage < totalPages"
                @click="goToPage(currentPage + 1)"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {{ t('common.next') }}
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  {{ t('common.showing') }} 
                  <span class="font-medium">{{ (currentPage - 1) * 12 + 1 }}</span>
                  {{ t('common.to') }}
                  <span class="font-medium">{{ Math.min(currentPage * 12, totalItems) }}</span>
                  {{ t('common.of') }}
                  <span class="font-medium">{{ totalItems }}</span>
                  {{ t('common.results') }}
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button 
                    v-if="currentPage > 1"
                    @click="goToPage(currentPage - 1)"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {{ t('common.previous') }}
                  </button>
                  <button 
                    v-if="currentPage < totalPages"
                    @click="goToPage(currentPage + 1)"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {{ t('common.next') }}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center">
        <div class="text-gray-500 text-lg mb-4">
          {{ t('reports.noReportsDescription') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReports, getLocalizedContent, type Report } from '@/composables/useReports'
import { formatEventDateLocalized } from '@/utils/dateUtils'

const { t, locale } = useI18n()
const { getReports } = useReports()

const currentPage = ref(1)

const { 
  isLoading, 
  isError, 
  data: reports, 
  error,
  refetch 
} = getReports(currentPage)

const reportsData = computed(() => reports.value?.data || [])
const totalPages = computed(() => reports.value?.meta?.last_page || 1)
const totalItems = computed(() => reports.value?.meta?.total || 0)

// Helper function to get localized content for a report
const getReportLocalizedContent = (report: Report, field: 'title' | 'description') => {
  if (!report || !report[field]) return ''
  return getLocalizedContent(report[field], locale.value)
}

// Helper to get a short description or fallback
const getShortDescription = (report: Report) => {
  const desc = getReportLocalizedContent(report, 'description')
  if (desc && desc.trim().length > 0) {
    return desc.length > 120 ? desc.slice(0, 120) + '…' : desc
  }
  return t('common.noData')
}

// Format published date
const formatPublishedDate = (date: string) => {
  return formatEventDateLocalized(date, locale.value, 'short')
}

// Navigation functions
const goToPage = (page: number) => {
  currentPage.value = page
}
</script> 