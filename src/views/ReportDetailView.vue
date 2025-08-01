<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
            <div class="lg:col-span-8">
              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="space-y-4">
                  <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div class="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
            <div class="lg:col-span-4">
              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="space-y-4">
                  <div class="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="text-red-600 text-lg mb-4">{{ t('common.error') }}</div>
        <p class="text-gray-600 mb-8">{{ error?.message }}</p>
        <button @click="() => refetch()" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          {{ t('common.tryAgain') }}
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="report" class="min-h-screen bg-gray-50">
      <!-- Header Section -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex items-center space-x-4">
            
          </div>
          
          <div class="mt-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ getReportLocalizedContent(report, 'title') }}
                </h1>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span v-if="report.published_at">{{ formattedPublishedDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Report Content -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Content -->
            <div v-if="localizedContent" class="prose prose-lg max-w-none">
              <div v-html="localizedContent"></div>
            </div>
            
            <!-- Attachments Section (replaced with AttachmentViewer) -->
            <AttachmentViewer :attachments="reportAttachments" />
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 px-6 pt-6 pb-4">{{ t('reports.details') }}</h3>
              
              <div class="px-6 pb-6 space-y-4">
                <!-- Published Date -->
                <div v-if="report.published_at">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('reports.publishedDate') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ formattedPublishedDate }}
                  </span>
                </div>

                <!-- Attachments Count -->
                <div v-if="report.attachments && report.attachments.length > 0">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('reports.attachments') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ report.attachments.length }}
                  </span>
                </div>
              </div>
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
import { useReports, getLocalizedContent, type Report } from '@/composables/useReports'
import { formatEventDateLocalized } from '@/utils/dateUtils'
import AttachmentViewer from '@/components/common/AttachmentViewer.vue'

const route = useRoute()
const { t, locale } = useI18n()
const { getReport } = useReports()

const slug = computed(() => route.params.slug as string)

const { 
  isLoading, 
  isError, 
  data: report, 
  error,
  refetch 
} = getReport(slug)

// Helper function to get localized content for a report
const getReportLocalizedContent = (report: Report, field: 'title' | 'description') => {
  if (!report || !report[field]) return ''
  return getLocalizedContent(report[field], locale.value)
}

// Format published date with computed property for reactivity
const formattedPublishedDate = computed(() => {
  if (!report.value?.published_at) return ''
  return formatEventDateLocalized(report.value.published_at, locale.value, 'short')
})

// Get localized content for the main content area
const localizedContent = computed(() => {
  if (!report.value?.description) return ''
  return getLocalizedContent(report.value.description, locale.value)
})

// Helper function to get file name from path
const getFileName = (filePath: string) => {
  return filePath.split('/').pop() || 'Document'
}

// Map report attachments to the expected format for AttachmentViewer
const reportAttachments = computed(() =>
  report.value?.attachments?.map(att => ({
    name: getFileName(att.file_path),
    url: att.url,
    size: 0 // Default size since report attachments do not have a size
  })) || []
)
</script> 