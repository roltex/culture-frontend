<template>
  <div>
    <!-- Loading State -->
    <div v-if="institution.isLoading" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">{{ t('message.loading') }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="institution.error" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p class="text-gray-600">{{ t('message.error') }}</p>
        <router-link to="/institutions" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700">
          {{ t('message.backToInstitutions') }}
        </router-link>
      </div>
    </div>

    <!-- Institution Detail -->
    <div v-else-if="institutionData" class="bg-gray-50 min-h-screen">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center mb-6">
            <router-link to="/institutions" class="inline-flex items-center text-blue-100 hover:text-white transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              {{ t('message.backToInstitutions') }}
            </router-link>
          </div>
          
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              {{ getLocalizedContent(institutionData.name, locale) }}
            </h1>
            
            <div class="flex items-center justify-center space-x-4 text-blue-100">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white bg-opacity-20">
                {{ getInstitutionTypeLabel(institutionData.type) }}
              </span>
              <span class="text-sm">
                {{ t('message.established') }} {{ institutionData.establishment_year }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <!-- Description -->
              <div class="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ t('institutions.about') }}</h2>
                <div class="prose max-w-none" v-html="getLocalizedContent(institutionData.description, locale)"></div>
              </div>

              <!-- Mission & Vision -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-xl shadow-sm p-8">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">{{ t('institutions.mission') }}</h3>
                  <p class="text-gray-600">{{ getLocalizedContent(institutionData.mission, locale) }}</p>
                </div>
                <div class="bg-white rounded-xl shadow-sm p-8">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">{{ t('institutions.vision') }}</h3>
                  <p class="text-gray-600">{{ getLocalizedContent(institutionData.vision, locale) }}</p>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <!-- Contact Information -->
              <div class="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h3 class="text-xl font-bold text-gray-900 mb-6">{{ t('institutions.contactInfo') }}</h3>
                
                <div class="space-y-4">
                  <div v-if="institutionData.director_name" class="flex items-start">
                    <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.director') }}</p>
                      <p class="text-gray-600">{{ institutionData.director_name }}</p>
                    </div>
                  </div>

                  <div v-if="institutionData.address" class="flex items-start">
                    <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.address') }}</p>
                      <p class="text-gray-600">{{ institutionData.address }}</p>
                    </div>
                  </div>

                  <div v-if="institutionData.phone" class="flex items-start">
                    <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.phone') }}</p>
                      <a :href="`tel:${institutionData.phone}`" class="text-blue-600 hover:text-blue-700">
                        {{ institutionData.phone }}
                      </a>
                    </div>
                  </div>

                  <div v-if="institutionData.email" class="flex items-start">
                    <svg class="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.email') }}</p>
                      <a :href="`mailto:${institutionData.email}`" class="text-blue-600 hover:text-blue-700">
                        {{ institutionData.email }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Website Link -->
              <div v-if="institutionData.website_url" class="bg-white rounded-xl shadow-sm p-8">
                <h3 class="text-xl font-bold text-gray-900 mb-6">{{ t('message.website') }}</h3>
                <a 
                  :href="institutionData.website_url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {{ t('message.visitWebsite') }}
                  <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSubordinateInstitutions } from '@/composables/useSubordinateInstitutions'
import type { SubordinateInstitution } from '@/composables/useSubordinateInstitutions'

const { t, locale } = useI18n()
const route = useRoute()

// Get institution ID from route
const institutionId = computed(() => parseInt(route.params.id as string))

// Fetch institution data
const { getSubordinateInstitutionById } = useSubordinateInstitutions()
const institution = getSubordinateInstitutionById(institutionId.value)

// Computed properties
const institutionData = computed<SubordinateInstitution | undefined>(() => institution.data.value)

// Helper function for localization
const getLocalizedContent = (content: { ka: string; en: string }, locale: string = 'ka') => {
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

// Helper function for institution type labels
const getInstitutionTypeLabel = (type: string) => {
  const typeLabels: Record<string, string> = {
    museum: t('institutions.types.museum'),
    educational: t('institutions.types.educational'),
    theater: t('institutions.types.theater'),
    ministry: t('institutions.types.ministry'),
    film: t('institutions.types.film'),
    youth: t('institutions.types.youth'),
    archives: t('institutions.types.archives'),
    library: t('institutions.types.library'),
    medical: t('institutions.types.medical'),
    tourism: t('institutions.types.tourism'),
    academy: t('institutions.types.academy')
  }
  return typeLabels[type] || type
}

// Set page title
onMounted(() => {
  if (institutionData.value) {
    document.title = `${getLocalizedContent(institutionData.value.name, locale.value)} - ${t('institutions.title')}`
  }
})
</script> 