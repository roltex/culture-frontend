<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          {{ t('institutions.title') }}
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          {{ t('institutions.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-gray-50 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <!-- Type Filter -->
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700">{{ t('institutions.filterByType') }}:</label>
            <select 
              v-model="selectedType" 
              @change="filterByType"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{{ t('institutions.allTypes') }}</option>
              <option 
                v-for="type in institutionTypes" 
                :key="type" 
                :value="type"
              >
                {{ getInstitutionTypeLabel(type) }}
              </option>
            </select>
          </div>

          <!-- Search -->
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('institutions.searchPlaceholder')"
                class="border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @input="filterInstitutions"
              />
              <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Institutions Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="institutions.isLoading && !institutionsData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-gray-200 h-48 rounded-xl mb-4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>

        <!-- Institutions Grid -->
        <div v-else-if="filteredInstitutions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SubordinateInstitutionCard 
            v-for="institution in filteredInstitutions" 
            :key="institution.id" 
            :institution="institution" 
          />
        </div>

        <!-- Error State -->
        <div v-else-if="institutions.error" class="text-center py-12">
          <div class="text-red-500 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p class="text-gray-600">{{ t('message.error') }}</p>
        </div>

        <!-- No Data State -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p class="text-gray-600">{{ t('institutions.noInstitutions') }}</p>
        </div>

        <!-- Results Count -->
        <div v-if="filteredInstitutions.length > 0" class="mt-8 text-center text-gray-600">
          {{ t('institutions.showingResults', { count: filteredInstitutions.length, total: institutionsData?.length || 0 }) }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SubordinateInstitutionCard from '@/components/institutions/SubordinateInstitutionCard.vue'
import { useSubordinateInstitutions } from '@/composables/useSubordinateInstitutions'
import type { SubordinateInstitution } from '@/composables/useSubordinateInstitutions'

const { t, locale } = useI18n()

// Fetch data
const { getSubordinateInstitutions, getSubordinateInstitutionTypes } = useSubordinateInstitutions()
const institutions = getSubordinateInstitutions()
const types = getSubordinateInstitutionTypes()

// Computed properties
const institutionsData = computed<SubordinateInstitution[] | undefined>(() => institutions.data.value)
const institutionTypes = computed(() => types.data.value || [])

// Filter state
const selectedType = ref('')
const searchQuery = ref('')

// Filtered institutions
const filteredInstitutions = computed(() => {
  if (!institutionsData.value) return []
  
  let filtered = institutionsData.value

  // Filter by type
  if (selectedType.value) {
    filtered = filtered.filter(institution => institution.type === selectedType.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(institution => {
      const name = getLocalizedContent(institution.name, locale.value).toLowerCase()
      const description = getLocalizedContent(institution.description, locale.value).toLowerCase()
      const director = institution.director_name.toLowerCase()
      
      return name.includes(query) || description.includes(query) || director.includes(query)
    })
  }

  return filtered
})

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

// Filter functions
const filterByType = () => {
  // The filtering is handled by the computed property
}

const filterInstitutions = () => {
  // The filtering is handled by the computed property
}

// Set page title
onMounted(() => {
  document.title = t('institutions.title')
})
</script> 