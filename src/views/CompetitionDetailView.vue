<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header Skeleton -->
        <div class="mb-8">
          <div class="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        
        <!-- Content Skeleton -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar Skeleton -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-red-50 border border-red-200 rounded-lg p-8">
          <div class="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('common.error') }}</h2>
          <p class="text-gray-600 mb-6">{{ $t('common.error_loading') }}</p>
          <button 
            @click="reloadPage"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {{ $t('common.tryAgain') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="competition">
      <!-- Compact Header Section -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="max-w-4xl">
            <h1 class="text-xl md:text-2xl font-semibold text-gray-900 leading-tight mb-2">
              {{ localizedTitle }}
            </h1>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span v-if="competition.published_at">{{ formattedPublishedDate }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span :class="competition.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'" class="text-xs font-semibold px-2 py-1 rounded-full">
                  {{ competition.is_active ? t('status.active', 'Active') : t('status.inactive', 'Inactive') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Competition Content -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Featured Image -->
            <div v-if="competition.featured_image" class="mb-8 pb-6 border-b border-gray-200">
              <img 
                :src="getImageUrl(competition.featured_image)" 
                :alt="getLocalizedContent(competition.title)"
                class="w-full h-64 lg:h-80 object-cover rounded-lg shadow-sm"
              />
            </div>



            <!-- Content -->
            <div v-if="competition.content" class="prose prose-lg max-w-none" v-html="localizedContent"></div>
            
            <!-- Attachments -->
            <AttachmentViewer :attachments="competitionAttachments" />
            

          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 px-6 pt-6 pb-4">{{ $t('competitions.details') }}</h3>
              
              <div class="px-6 pb-6 space-y-4">
                <!-- Status -->
                <div>
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ $t('message.status') }}
                  </span>
                  <span :class="competition.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold">
                    {{ competition.is_active ? t('status.active', 'Active') : t('status.inactive', 'Inactive') }}
                  </span>
                </div>

                <!-- Prize Amount -->
                <div v-if="competition.prize_amount">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ $t('competitions.prizeAmount') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ competition.prize_amount }} ₾
                  </span>
                </div>

                <!-- Max Participants -->
                <div v-if="competition.max_participants">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ $t('competitions.maxParticipants') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ competition.max_participants }}
                  </span>
                </div>

                <!-- Application Deadline -->
                <div v-if="competition.application_deadline">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ $t('competitions.deadline') }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ formattedDeadlineDate }}
                  </span>
                </div>

                <!-- Contact Email -->
                <div v-if="competition.contact_email">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ $t('message.email') }}
                  </span>
                  <a 
                    :href="`mailto:${competition.contact_email}`"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {{ competition.contact_email }}
                  </a>
                </div>

                <!-- Contact Phone -->
                <div v-if="competition.contact_phone">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ $t('message.phone') }}
                  </span>
                  <a 
                    :href="`tel:${competition.contact_phone}`"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {{ competition.contact_phone }}
                  </a>
                </div>




              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Application Form Modal -->
    <div
      v-if="showApplicationModal && competition?.application_form"
      class="fixed inset-0 z-50 overflow-hidden"
      @click="closeApplicationModal"
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
                    {{ $t('competitions.applicationForm') }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ $t('common.pdfDocument') }}</p>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center space-x-2 flex-shrink-0">
                <button
                  @click="openPDFInNewTab"
                  class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                  :title="$t('common.openInNewTab')"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {{ $t('common.openInNewTab') }}
                </button>
                <button
                  @click="downloadApplicationForm"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                  title="ფაილის ჩამოტვირთვა"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ $t('common.download') }}
                </button>
                <button
                  @click="closeApplicationModal"
                  class="inline-flex items-center p-2 bg-white border border-gray-300 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                  :title="$t('common.close')"
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
              :src="applicationFormUrl + '#toolbar=1&navpanes=1&scrollbar=1'"
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
                <p class="text-gray-600">{{ $t('common.pdfLoading') }}</p>
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
                <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('common.pdfError') }}</h4>
                <p class="text-gray-600 mb-6">{{ $t('common.pdfErrorDescription') }}</p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    @click="openPDFInNewTab"
                    class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {{ $t('common.openInNewTab') }}
                  </button>
                  <button
                    @click="downloadApplicationForm"
                    class="inline-flex items-center px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {{ $t('common.download') }}
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCompetitions, getLocalizedContent } from '@/composables/useCompetitions'
import { formatEventDateLocalized } from '@/utils/dateUtils'
import { getImageUrl } from '@/utils/getImageUrl'
import AttachmentViewer from '@/components/common/AttachmentViewer.vue'

const route = useRoute()
const { t, locale } = useI18n()
const { getCompetitionBySlug } = useCompetitions()

const slug = computed(() => route.params.slug as string)
const competitionQuery = getCompetitionBySlug(slug.value)
const competition = computed(() => competitionQuery.data.value)
const isLoading = computed(() => competitionQuery.isLoading.value)
const isError = computed(() => competitionQuery.isError.value)

// Transform competition attachments (application form) to the format expected by AttachmentViewer
const competitionAttachments = computed(() => {
  if (!competition.value?.application_form) return []
  
  return [{
    name: 'application_form.pdf',
    url: competition.value.application_form,
    size: 0 // We don't have size info for this field
  }]
})

// Computed properties for localized content
const localizedContent = computed(() => {
  if (!competition.value?.content) return ''
  return getLocalizedContent(competition.value.content, locale.value)
})

const localizedTitle = computed(() => {
  if (!competition.value?.title) return ''
  return getLocalizedContent(competition.value.title, locale.value)
})

// Computed properties for localized dates
const formattedPublishedDate = computed(() => {
  if (!competition.value?.published_at) return ''
  return formatEventDateLocalized(competition.value.published_at, locale.value, 'short')
})

const formattedDeadlineDate = computed(() => {
  if (!competition.value?.application_deadline) return ''
  return formatEventDateLocalized(competition.value.application_deadline, locale.value, 'short')
})





const reloadPage = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

// Application form modal state
const showApplicationModal = ref(false)
const pdfLoading = ref(false)
const pdfLoadError = ref(false)

// Application form URL
const applicationFormUrl = computed(() => {
  if (!competition.value?.application_form) return ''
  return getImageUrl(competition.value.application_form)
})



const closeApplicationModal = () => {
  showApplicationModal.value = false
  pdfLoadError.value = false
  pdfLoading.value = false
}

const openPDFInNewTab = () => {
  if (applicationFormUrl.value) {
    window.open(applicationFormUrl.value, '_blank', 'noopener,noreferrer')
  }
}

const downloadApplicationForm = () => {
  if (applicationFormUrl.value) {
    const link = document.createElement('a')
    link.href = applicationFormUrl.value
    link.download = 'application_form.pdf'
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
      window.open(applicationFormUrl.value, '_blank', 'noopener,noreferrer')
    }
  }
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
</script> 