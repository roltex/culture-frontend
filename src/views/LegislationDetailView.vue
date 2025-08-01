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
    <div v-else-if="legislation" class="min-h-screen bg-gray-50">
      <!-- Header Section -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex items-center space-x-4">
            
          </div>
          
          <div class="mt-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ getLegislationLocalizedContent(legislation, 'title') }}
                </h1>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span v-if="legislation.published_at">{{ formattedPublishedDate }}</span>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ getLocalizedContent(legislation.document_type, locale) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Legislation Content -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Content -->
            <div v-if="localizedContent" class="prose prose-lg max-w-none">
              <div v-html="localizedContent"></div>
            </div>
            
            <!-- Documents Section -->
            <div v-if="hasDocuments" class="mt-8 pt-8 border-t border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('legislation.documents') }}</h3>
              <div class="space-y-3">
                <div v-if="legislation.document_url" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ t('legislation.mainDocument') }}</h4>
                    <p class="text-sm text-gray-500">{{ t('legislation.pdfDocument') }}</p>
                  </div>
                  <button 
                    @click="openPDFModal(legislation.document_url, t('legislation.mainDocument'))"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {{ t('common.download') }}
                  </button>
                </div>
                
                <div v-if="legislation.document_url_ka" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ t('legislation.georgianDocument') }}</h4>
                    <p class="text-sm text-gray-500">{{ t('legislation.pdfDocument') }}</p>
                  </div>
                  <button 
                    @click="openPDFModal(legislation.document_url_ka, t('legislation.georgianDocument'))"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {{ t('common.download') }}
                  </button>
                </div>
                
                <div v-if="legislation.document_url_en" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ t('legislation.englishDocument') }}</h4>
                    <p class="text-sm text-gray-500">{{ t('legislation.pdfDocument') }}</p>
                  </div>
                  <button 
                    @click="openPDFModal(legislation.document_url_en, t('legislation.englishDocument'))"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {{ t('common.download') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- PDF Modal -->
            <div
              v-if="showPDFModal && currentPDF"
              class="fixed inset-0 z-50 overflow-hidden"
              @click="closePDFModal"
            >
              <!-- Backdrop with blur effect -->
              <div class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"></div>
              
              <!-- Modal Container -->
              <div class="relative w-full h-full flex items-center justify-center p-4">
                <div 
                  class="relative w-full h-full max-w-7xl max-h-full bg-white rounded-xl shadow-2xl overflow-hidden"
                  @click.stop
                >
                  <!-- Modern Header -->
                  <div class="relative bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
                    <div class="flex items-center justify-between">
                      <!-- File Info -->
                      <div class="flex items-center space-x-3 min-w-0 flex-1">
                        <div class="flex-shrink-0">
                          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                          </div>
                        </div>
                        <div class="min-w-0 flex-1">
                          <h3 class="text-lg font-semibold text-gray-900 truncate">
                            {{ currentPDF.name }}
                          </h3>
                          <p class="text-sm text-gray-500">{{ t('legislation.pdfDocument') }}</p>
                        </div>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="flex items-center space-x-2 flex-shrink-0">
                        <button
                          @click="openPDFInNewTab(currentPDF)"
                          class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                          :title="t('common.openInNewTab')"
                        >
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {{ t('common.openInNewTab') }}
                        </button>
                        <button
                          @click="downloadFile(currentPDF)"
                          class="inline-flex items-center px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                          :title="t('common.download')"
                        >
                          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {{ t('common.download') }}
                        </button>
                        <button
                          @click="closePDFModal"
                          class="inline-flex items-center p-2 bg-white border border-gray-300 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                          :title="t('common.close')"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- PDF Viewer -->
                  <div class="relative h-full bg-gray-50" style="height: calc(100% - 80px);">
                    <!-- PDF Iframe -->
                    <iframe
                      :src="getFullPDFUrl(currentPDF.url)"
                      class="w-full h-full border-0 bg-white"
                      title="PDF Viewer"
                      frameborder="0"
                      allowfullscreen
                      @load="onPDFLoad"
                      @error="onPDFError"
                    ></iframe>
                    
                    <!-- Loading State -->
                    <div v-if="pdfLoading && !pdfLoadError" class="absolute inset-0 bg-gray-50 flex items-center justify-center">
                      <div class="text-center">
                        <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p class="text-gray-600">{{ t('common.pdfLoading') }}</p>
                      </div>
                    </div>
                    
                    <!-- Error State -->
                    <div v-if="pdfLoadError" class="absolute inset-0 bg-gray-50 flex items-center justify-center">
                      <div class="text-center max-w-md mx-auto p-8">
                        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ t('common.pdfError') }}</h4>
                        <p class="text-gray-600 mb-6">{{ t('common.pdfErrorDescription') }}</p>
                        <div class="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            @click="openPDFInNewTab(currentPDF)"
                            class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {{ t('common.openInNewTab') }}
                          </button>
                          <button
                            @click="downloadFile(currentPDF)"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                          >
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {{ t('common.download') }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 px-6 pt-6 pb-4">{{ t('legislation.details') }}</h3>
              
              <div class="px-6 pb-6 space-y-4">
                <!-- Act Number -->
                <div v-if="legislation.act_number">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('legislation.actNumber') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ legislation.act_number }}
                  </span>
                </div>

                <!-- Document Type -->
                <div v-if="legislation.document_type">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('legislation.documentType') }}
                  </span>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ getLocalizedContent(legislation.document_type, locale) }}
                  </span>
                </div>

                <!-- Adoption Date -->
                <div v-if="legislation.adoption_date">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('legislation.adoptionDate') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ formatAdoptionDate(legislation.adoption_date) }}
                  </span>
                </div>

                <!-- Effective Date -->
                <div v-if="legislation.effective_date">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('legislation.effectiveDate') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ formatEffectiveDate(legislation.effective_date) }}
                  </span>
                </div>

                <!-- Published Date -->
                <div v-if="legislation.published_at">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('legislation.publishedDate') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ formattedPublishedDate }}
                  </span>
                </div>



                <!-- Documents Count -->
                <div v-if="hasDocuments">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('legislation.documents') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ getDocumentCount(legislation) }}
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLegislation, getLocalizedContent, type Legislation } from '@/composables/useLegislation'
import { formatEventDateLocalized } from '@/utils/dateUtils'

const route = useRoute()
const { t, locale } = useI18n()
const { getLegislationBySlug } = useLegislation()

const slug = computed(() => route.params.slug as string)

const { 
  isLoading, 
  isError, 
  data: legislation, 
  error,
  refetch 
} = getLegislationBySlug(slug)

// Modal state
const showPDFModal = ref(false)
const currentPDF = ref<{ name: string; url: string } | null>(null)
const pdfLoadError = ref(false)
const pdfLoading = ref(false)

// Helper function to get localized content for legislation
const getLegislationLocalizedContent = (legislation: Legislation, field: 'title' | 'description' | 'content') => {
  if (!legislation || !legislation[field]) return ''
  return getLocalizedContent(legislation[field], locale.value)
}

// Format published date with computed property for reactivity
const formattedPublishedDate = computed(() => {
  if (!legislation.value?.published_at) return ''
  return formatEventDateLocalized(legislation.value.published_at, locale.value, 'short')
})

// Get localized content for the main content area
const localizedContent = computed(() => {
  if (!legislation.value?.description) return ''
  return getLocalizedContent(legislation.value.description, locale.value)
})

// Format adoption date
const formatAdoptionDate = (date: string) => {
  return formatEventDateLocalized(date, locale.value, 'short')
}

// Format effective date
const formatEffectiveDate = (date: string) => {
  return formatEventDateLocalized(date, locale.value, 'short')
}

// Check if legislation has documents
const hasDocuments = computed(() => {
  if (!legislation.value) return false
  return legislation.value.document_file || legislation.value.document_file_ka || legislation.value.document_file_en
})

// Get document count
const getDocumentCount = (legislation: Legislation) => {
  let count = 0
  if (legislation.document_file) count++
  if (legislation.document_file_ka) count++
  if (legislation.document_file_en) count++
  return count
}

// PDF Modal functions
const openPDFModal = (url: string, name: string) => {
  currentPDF.value = { name, url }
  pdfLoadError.value = false
  pdfLoading.value = true
  showPDFModal.value = true
}

const closePDFModal = () => {
  showPDFModal.value = false
  currentPDF.value = null
  pdfLoadError.value = false
  pdfLoading.value = false
}

const onPDFLoad = () => {
  pdfLoadError.value = false
  pdfLoading.value = false
}

const onPDFError = () => {
  pdfLoadError.value = true
  pdfLoading.value = false
}

const openPDFInNewTab = (pdf: { name: string; url: string }) => {
  window.open(pdf.url, '_blank', 'noopener,noreferrer')
}

const downloadFile = (pdf: { name: string; url: string }) => {
  const link = document.createElement('a')
  link.href = pdf.url
  link.download = pdf.name + '.pdf'
  link.target = '_blank'
  link.style.display = 'none'
  
  try {
    document.body.appendChild(link)
    link.click()
    
    setTimeout(() => {
      if (link.parentNode) {
        document.body.removeChild(link)
      }
    }, 100)
  } catch (error) {
    console.error('Download failed:', error)
    window.open(pdf.url, '_blank', 'noopener,noreferrer')
  }
}

// Helper function to get full PDF URL for iframe
const getFullPDFUrl = (url: string) => {
  // If the URL is already a full URL, use it directly
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url + '#toolbar=1&navpanes=1&scrollbar=1'
  }
  
  // For relative URLs, construct the full backend URL
  // Remove leading slash if present
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url
  const backendUrl = 'http://localhost:8000/' + cleanUrl
  return backendUrl + '#toolbar=1&navpanes=1&scrollbar=1'
}
</script> 