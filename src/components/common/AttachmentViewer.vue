<template>
  <div v-if="attachments && attachments.length > 0" class="mt-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('common.attachments') }}</h3>
    <div class="space-y-3">
      <div
        v-for="attachment in validAttachments"
        :key="attachment.url"
        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
      >
        <div>
          <h4 class="font-medium text-gray-900">{{ t('common.attachedDocument') }}</h4>
          <p class="text-sm text-gray-500">{{ getFileTypeText(attachment.name) }}</p>
        </div>
        <button 
          @click="handleAttachmentClick(attachment)"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {{ isPDF(attachment.name) ? t('common.view') : t('common.download') }}
        </button>
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
                  <p class="text-sm text-gray-500">{{ t('common.pdfDocument') }}</p>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NewsAttachment } from '@/composables/useNews'
import type { ProjectAttachment } from '@/composables/useProjects'
import { getImageUrl } from '@/utils/getImageUrl'

interface Props {
  attachments: NewsAttachment[] | ProjectAttachment[]
}

const props = defineProps<Props>()

const { t } = useI18n()

const showPDFModal = ref(false)
const currentPDF = ref<NewsAttachment | ProjectAttachment | null>(null)
const pdfLoadError = ref(false)
const pdfLoading = ref(false)

// Filter out invalid attachments
const validAttachments = computed(() => 
  props.attachments?.filter((att: NewsAttachment | ProjectAttachment) => att && att.url) || []
)

const isPDF = (filename: string | undefined): boolean => {
  if (!filename) return false
  return filename.toLowerCase().endsWith('.pdf')
}

const getFileExtension = (filename: string | undefined): string => {
  if (!filename) return ''
  return filename.toLowerCase().split('.').pop() || ''
}

const getFileTypeText = (filename: string | undefined): string => {
  const ext = getFileExtension(filename)
  if (ext === 'pdf') return t('common.pdfDocument')
  if (['doc', 'docx'].includes(ext)) return t('common.wordDocument')
  if (['xls', 'xlsx'].includes(ext)) return t('common.excelDocument')
  return t('common.document')
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleAttachmentClick = (attachment: NewsAttachment | ProjectAttachment) => {
  if (isPDF(attachment.name)) {
    const fullUrl = getImageUrl(attachment.url)
    console.log('Opening PDF:', fullUrl)
    const attachmentWithFullUrl = { ...attachment, url: fullUrl }
    currentPDF.value = attachmentWithFullUrl
    pdfLoadError.value = false
    pdfLoading.value = true
    showPDFModal.value = true
  } else {
    downloadFile(attachment)
  }
}

const getFullPDFUrl = (url: string): string => {
  const fullUrl = getImageUrl(url)
  return `${fullUrl}#toolbar=1&navpanes=1&scrollbar=1`
}

const downloadFile = (attachment: NewsAttachment | ProjectAttachment) => {
  const fullUrl = getImageUrl(attachment.url)
  const link = document.createElement('a')
  link.href = fullUrl
  link.download = attachment.name || 'download'
  link.target = '_blank'
  link.style.display = 'none'
  
  try {
    document.body.appendChild(link)
    link.click()
    
    // Use setTimeout to ensure the click event is processed before removing
    setTimeout(() => {
      if (link.parentNode) {
        document.body.removeChild(link)
      }
    }, 100)
  } catch (error) {
    console.error('Download failed:', error)
    // Fallback: open in new window
    window.open(fullUrl, '_blank', 'noopener,noreferrer')
  }
}

const closePDFModal = () => {
  showPDFModal.value = false
  currentPDF.value = null
  pdfLoadError.value = false
  pdfLoading.value = false
}

const onPDFLoad = () => {
  try {
    pdfLoadError.value = false
    pdfLoading.value = false
  } catch (error) {
    console.error('PDF load handler error:', error)
  }
}

const onPDFError = () => {
  try {
    pdfLoadError.value = true
    pdfLoading.value = false
  } catch (error) {
    console.error('PDF error handler error:', error)
  }
}

const openPDFInNewTab = (attachment: NewsAttachment | ProjectAttachment) => {
  const fullUrl = getImageUrl(attachment.url)
  window.open(fullUrl, '_blank', 'noopener,noreferrer')
}
</script> 