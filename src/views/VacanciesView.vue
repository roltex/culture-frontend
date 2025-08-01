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

      <!-- Vacancies Table -->
      <div v-else-if="vacanciesData && vacanciesData.length > 0" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ t('vacancies.title') }} ({{ vacanciesData.length }})
          </h2>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('vacancies.details') || 'Details' }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('vacancies.department') || 'Department' }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('vacancies.applicationDeadline') || 'Deadline' }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ t('common.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="vacancy in vacanciesData" :key="vacancy.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-medium text-gray-900 mb-1">
                      {{ getVacancyLocalizedContent(vacancy, 'title') }}
                    </h3>
                    <p class="text-sm text-gray-600 line-clamp-2">
                      {{ getShortDescription(vacancy) }}
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ vacancy.department || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDeadline(vacancy.application_deadline) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <router-link 
                    :to="`/vakansiebi/${vacancy.slug}`"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    {{ t('common.read_more') }}
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center">
        <div class="text-gray-500 text-lg mb-4">
          {{ t('vacancies.noVacanciesDescription') || t('common.noData') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVacancies } from '@/composables/useVacancies'
import { formatEventDateLocalized } from '@/utils/dateUtils'

const { t, locale } = useI18n()
const { getVacanciesWithMeta } = useVacancies()
const { isLoading, isError, data: vacancies, error, refetch } = getVacanciesWithMeta()
const vacanciesData = computed(() => vacancies.value?.data || [])

// Helper function to get localized content for a vacancy
const getVacancyLocalizedContent = (vacancy: any, field: 'title' | 'description') => {
  if (!vacancy || !vacancy[field]) return ''
  return vacancy[field][locale.value] || vacancy[field].ka || vacancy[field].en || ''
}

// Helper to get a short description or fallback
const getShortDescription = (vacancy: any) => {
  const desc = getVacancyLocalizedContent(vacancy, 'description')
  if (desc && desc.trim().length > 0) {
    return desc.length > 120 ? desc.slice(0, 120) + '…' : desc
  }
  return t('common.noData')
}

// Format deadline
const formatDeadline = (date: string) => {
  return formatEventDateLocalized(date, locale.value, 'short')
}
</script>