<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ t('competitions.title') }}
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ t('competitions.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-6">
            <div class="h-6 bg-gray-200 rounded mb-4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div class="mt-4 flex justify-between items-center">
              <div class="h-4 bg-gray-200 rounded w-20"></div>
              <div class="h-8 bg-gray-200 rounded w-16"></div>
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

      <!-- Competitions List -->
      <div v-else-if="competitionsData && competitionsData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="competition in competitionsData" :key="competition.id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <router-link :to="`/konkursebi/${competition.slug}`" class="block">
            <!-- Competition Image -->
            <div class="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50">
              <img 
                v-if="competition.featured_image" 
                :src="getImageUrl(competition.featured_image)" 
                :alt="getCompetitionLocalizedContent(competition, 'title')"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <!-- Status Badge -->
              <div class="absolute top-4 left-4">
                <span 
                  :class="competition.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                  class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
                >
                  {{ competition.is_active ? t('status.active', 'Active') : t('status.inactive', 'Inactive') }}
                </span>
              </div>
            </div>

            <!-- Competition Content -->
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {{ getCompetitionLocalizedContent(competition, 'title') }}
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                {{ getCompetitionLocalizedContent(competition, 'description') }}
              </p>

              <!-- Competition Meta -->
              <div class="space-y-2 text-sm text-gray-500">
                <div v-if="competition.prize_amount" class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  <span>{{ t('competitions.prizeAmount') }}: {{ formatPrizeAmount(competition.prize_amount) }}</span>
                </div>
                
                <div v-if="competition.max_participants" class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span>{{ t('competitions.maxParticipants') }}: {{ competition.max_participants }}</span>
                </div>

                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{{ t('competitions.deadline') }}: {{ formatDeadline(competition.application_deadline) }}</span>
                </div>
              </div>

              <!-- Deadline Display -->
              <div class="mt-4">
                <span class="text-xs text-gray-500">
                  {{ formatDeadline(competition.application_deadline) }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center">
        <div class="text-gray-500 text-lg mb-4">
          {{ t('competitions.noCompetitionsDescription') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCompetitions, getLocalizedContent, type Competition } from '@/composables/useCompetitions'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatEventDateLocalized } from '@/utils/dateUtils'

const { t, locale } = useI18n()
const { getCompetitions } = useCompetitions()

const { 
  isLoading, 
  isError, 
  data: competitions, 
  error,
  refetch 
} = getCompetitions()

const competitionsData = computed(() => competitions.value || [])

// Helper function to get localized content for a competition
const getCompetitionLocalizedContent = (competition: Competition, field: 'title' | 'description') => {
  if (!competition || !competition[field]) return ''
  return getLocalizedContent(competition[field], locale.value)
}

// Format prize amount with computed property for reactivity
const formatPrizeAmount = (amount: string | number) => {
  if (!amount) return ''
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat(locale.value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numAmount) + ' ₾'
}

// Format deadline with computed property for reactivity
const formatDeadline = (deadline: string) => {
  if (!deadline) return ''
  return formatEventDateLocalized(deadline, locale.value, 'short')
}


</script> 