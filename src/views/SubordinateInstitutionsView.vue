<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ t('institutions.title') }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="institutions.isLoading && !institutionsData" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-white p-6 flex flex-col items-center justify-center text-center h-48 rounded-lg">
              <div class="h-20 w-20 bg-gray-200 rounded mb-4"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="institutions.error && !institutionsData" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('message.error') }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ institutions.error?.value?.message || t('message.error') }}</p>
        </div>
      </div>

      <!-- Institutions Grid -->
      <div v-if="filteredInstitutions.length > 0" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubordinateInstitutionCard 
            v-for="institution in filteredInstitutions" 
            :key="institution.id" 
            :institution="institution" 
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!institutions.isLoading && filteredInstitutions.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('institutions.noInstitutions') }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ t('institutions.noInstitutionsDescription') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SubordinateInstitutionCard from '@/components/institutions/SubordinateInstitutionCard.vue'
import { useSubordinateInstitutions } from '@/composables/useSubordinateInstitutions'
import type { SubordinateInstitution } from '@/composables/useSubordinateInstitutions'

const { t } = useI18n()

// Fetch data
const { getSubordinateInstitutions } = useSubordinateInstitutions()
const institutions = getSubordinateInstitutions()

// Log error for debugging
watch(() => institutions.error, (err) => {
  if (err) {
    console.error('Institutions error:', err)
  }
})

// Computed properties
const institutionsData = computed<SubordinateInstitution[] | undefined>(() => {
  return institutions.data.value
})

// For now, show all institutions (removed filters to match news layout)
const filteredInstitutions = computed(() => {
  return institutionsData.value || []
})

// Set page title
onMounted(() => {
  document.title = t('institutions.title')
})
</script> 