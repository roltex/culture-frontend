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
    <div v-else-if="vacancy" class="min-h-screen bg-gray-50">
      <!-- Header Section -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="mt-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ getVacancyLocalizedContent(vacancy, 'title') }}
                </h1>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span v-if="vacancy.department">{{ vacancy.department }}</span>
                  <span v-if="vacancy.location">{{ getVacancyLocalizedContent(vacancy, 'location') }}</span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span 
                  :class="vacancy.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                  class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
                >
                  {{ vacancy.is_active ? t('status.active', 'Active') : t('status.inactive', 'Inactive') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Vacancy Content -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Description -->
            <div v-if="localizedDescription" class="prose prose-lg max-w-none mb-8">
              <div v-html="localizedDescription"></div>
            </div>
            
            <!-- Requirements -->
            <div v-if="localizedRequirements" class="prose prose-lg max-w-none mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ t('vacancies.requirements') || 'Requirements' }}</h2>
              <div v-html="localizedRequirements"></div>
            </div>

            <!-- Attachments Section -->
            <AttachmentViewer :attachments="vacancyAttachments" />
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 px-6 pt-6 pb-4">{{ t('vacancies.details') || 'Job Details' }}</h3>
              
              <div class="px-6 pb-6 space-y-4">
                <!-- Department -->
                <div v-if="vacancy.department">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.department') || 'Department' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ vacancy.department }}
                  </span>
                </div>

                <!-- Location -->
                <div v-if="vacancy.location">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.location') || 'Location' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ getVacancyLocalizedContent(vacancy, 'location') }}
                  </span>
                </div>

                <!-- Employment Type -->
                <div v-if="vacancy.employment_type">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.employmentType') || 'Employment Type' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ getEmploymentTypeLabel(vacancy.employment_type) }}
                  </span>
                </div>

                <!-- Salary Range -->
                <div v-if="vacancy.salary_range">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.salaryRange') || 'Salary Range' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ vacancy.salary_range }}
                  </span>
                </div>

                <!-- Application Deadline -->
                <div v-if="vacancy.application_deadline">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.applicationDeadline') || 'Application Deadline' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ formattedDeadline }}
                  </span>
                </div>

                <!-- Start Date -->
                <div v-if="vacancy.start_date">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.startDate') || 'Start Date' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ formattedStartDate }}
                  </span>
                </div>

                <!-- Duration -->
                <div v-if="vacancy.duration">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.duration') || 'Duration' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ vacancy.duration }}
                  </span>
                </div>

                <!-- Attachments Count -->
                <div v-if="vacancy.attachments && vacancy.attachments.length > 0">
                  <span class="text-sm font-medium text-gray-500 block mb-1">
                    {{ t('vacancies.attachments') || 'Attachments' }}
                  </span>
                  <span class="text-lg font-semibold text-gray-900">
                    {{ vacancy.attachments.length }}
                  </span>
                </div>

                <!-- Contact Information -->
                <div v-if="vacancy.contact_email || vacancy.contact_phone" class="pt-4 border-t border-gray-200">
                  <h4 class="text-lg font-semibold text-gray-900 mb-3">{{ t('vacancies.contactInfo') || 'Contact Information' }}</h4>
                  
                  <div v-if="vacancy.contact_email" class="mb-2">
                    <span class="text-sm font-medium text-gray-500 block mb-1">
                      {{ t('vacancies.email') || 'Email' }}
                    </span>
                    <a :href="`mailto:${vacancy.contact_email}`" class="text-blue-600 hover:text-blue-800">
                      {{ vacancy.contact_email }}
                    </a>
                  </div>

                  <div v-if="vacancy.contact_phone">
                    <span class="text-sm font-medium text-gray-500 block mb-1">
                      {{ t('vacancies.phone') || 'Phone' }}
                    </span>
                    <a :href="`tel:${vacancy.contact_phone}`" class="text-blue-600 hover:text-blue-800">
                      {{ vacancy.contact_phone }}
                    </a>
                  </div>
                </div>

                <!-- Application Form URL (if external) -->
                <div v-if="vacancy.application_form_url && !vacancy.application_form" class="pt-4 border-t border-gray-200">
                  <a 
                    :href="vacancy.application_form_url" 
                    target="_blank"
                    class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {{ t('vacancies.applyNow') || 'Apply Now' }}
                  </a>
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
import { useVacancies } from '@/composables/useVacancies'
import { formatEventDateLocalized } from '@/utils/dateUtils'
import AttachmentViewer from '@/components/common/AttachmentViewer.vue'

const route = useRoute()
const { t, locale } = useI18n()
const { getVacancyBySlug } = useVacancies()

const slug = computed(() => route.params.slug as string)

const { 
  isLoading, 
  isError, 
  data: vacancy, 
  error,
  refetch 
} = getVacancyBySlug(slug.value)

// Helper function to get localized content for a vacancy
const getVacancyLocalizedContent = (vacancy: any, field: 'title' | 'description' | 'requirements' | 'location') => {
  if (!vacancy || !vacancy[field]) return ''
  return vacancy[field][locale.value] || vacancy[field].ka || vacancy[field].en || ''
}

// Format deadline with computed property for reactivity
const formattedDeadline = computed(() => {
  if (!vacancy.value?.application_deadline) return ''
  return formatEventDateLocalized(vacancy.value.application_deadline, locale.value, 'short')
})

// Format start date with computed property for reactivity
const formattedStartDate = computed(() => {
  if (!vacancy.value?.start_date) return ''
  return formatEventDateLocalized(vacancy.value.start_date, locale.value, 'short')
})

// Get localized description for the main content area
const localizedDescription = computed(() => {
  if (!vacancy.value?.description) return ''
  return getVacancyLocalizedContent(vacancy.value, 'description')
})

// Get localized requirements for the main content area
const localizedRequirements = computed(() => {
  if (!vacancy.value?.requirements) return ''
  return getVacancyLocalizedContent(vacancy.value, 'requirements')
})

// Helper function to get file name from path
const getFileName = (filePath: string) => {
  return filePath.split('/').pop() || 'Document'
}

// Map vacancy attachments to the expected format for AttachmentViewer
const vacancyAttachments = computed(() => {
  const attachments = []
  
  // Add regular attachments
  if (vacancy.value?.attachments) {
    attachments.push(...vacancy.value.attachments.map(att => ({
      name: getFileName(att.file_path),
      url: att.url,
      size: 0 // Default size since vacancy attachments do not have a size
    })))
  }
  
  // Add application form as attachment if it exists
  if (vacancy.value?.application_form) {
    attachments.push({
      name: getFileName(vacancy.value.application_form),
      url: vacancy.value.application_form,
      size: 0
    })
  }
  
  return attachments
})

// Helper function to get employment type label
const getEmploymentTypeLabel = (type: string) => {
  const labels = {
    full_time: t('vacancies.fullTime', 'Full Time'),
    part_time: t('vacancies.partTime', 'Part Time'),
    contract: t('vacancies.contract', 'Contract'),
    temporary: t('vacancies.temporary', 'Temporary'),
    internship: t('vacancies.internship', 'Internship')
  }
  return labels[type as keyof typeof labels] || type
}
</script> 