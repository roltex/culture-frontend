<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ $t('calendars.title') }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar with Calendar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            
            <!-- Calendar Component -->
            <div class="calendar-wrapper">
              <div class="calendar-header flex items-center justify-between mb-4">
                <button 
                  @click="previousMonth"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h4 class="text-lg font-medium text-gray-900">
                  {{ currentMonthYear }}
                </h4>
                <button 
                  @click="nextMonth"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Calendar Grid -->
              <div class="calendar-grid">
                <!-- Weekday Headers -->
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in weekDays" :key="day" class="text-center text-xs font-medium text-gray-500 py-1">
                    {{ day }}
                  </div>
                </div>

                <!-- Calendar Days -->
                <div class="grid grid-cols-7 gap-1">
                  <div 
                    v-for="day in calendarDays" 
                    :key="day.key"
                    @click="selectDate(day.date)"
                    :class="[
                      'relative p-2 text-center text-sm cursor-pointer rounded-lg transition-colors min-h-[40px] flex flex-col items-center justify-center',
                      day.isCurrentMonth 
                        ? 'hover:bg-blue-50' 
                        : 'text-gray-300',
                      day.isSelected 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : day.isToday 
                          ? 'bg-blue-100 text-blue-900' 
                          : 'text-gray-900'
                    ]"
                  >
                    <span>{{ day.dayNumber }}</span>
                    <!-- Event Count Badge -->
                    <div 
                      v-if="day.eventCount > 0 && day.isCurrentMonth" 
                      class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      :class="day.isSelected ? 'bg-white text-red-500' : ''"
                    >
                      {{ day.eventCount > 9 ? '9+' : day.eventCount }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Clear Filter Button -->
              <div class="mt-4">
                <button 
                  @click="clearDateFilter"
                  class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {{ $t('calendars.clearFilter') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3">
          <!-- Loading State -->
          <div v-if="isLoading" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Skeleton Cards -->
              <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="animate-pulse">
                  <div class="h-48 bg-gray-200"></div>
                  <div class="p-6">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="isError" class="text-center py-12">
            <div class="max-w-md mx-auto">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('message.error') }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ error?.message }}</p>
              <div class="mt-6">
                <button
                  @click="() => refetch()"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {{ t('message.tryAgain') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Calendar Events Grid -->
          <div v-else-if="filteredData && filteredData.length > 0" class="space-y-8">
            <!-- Filter Info -->
            <div v-if="selectedDate" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-blue-900 font-medium">
                    {{ $t('calendars.eventsOn') }} {{ formatFullEventDateLocalized(selectedDate?.toISOString?.() || '', locale, 'short') }}
                  </span>
                </div>
                <span class="text-blue-700 text-sm">{{ filteredData.length }} {{ t('calendars.events', filteredData.length) }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CalendarCard
                v-for="calendar in filteredData"
                :key="calendar.id"
                :calendar="calendar"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
              {{ t('calendars.noEventsOnDate') }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ t('calendars.noEventsOnDateDescription') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- DEBUG: Show current locale and translation result -->
  <div style="display:none">
    Locale: {{ locale }}
    noEventsOnDate: {{ t('calendars.noEventsOnDate') }}
    noEventsOnDateDescription: {{ t('calendars.noEventsOnDateDescription') }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuery } from '@tanstack/vue-query'
import CalendarCard from '@/components/calendars/CalendarCard.vue'
import api from '@/services/api'
import { getMonthNames, getWeekdayNames, formatFullEventDateLocalized } from '@/utils/dateUtils'

const { t, locale } = useI18n()

// Calendar state
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)

// Week days
const weekDays = computed(() => getWeekdayNames(locale.value))

// Get all calendar data for filtering
const { data: allCalendarsData, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['all-calendars'],
  queryFn: async () => {
    const response = await api.get('/calendars?per_page=1000') // Get all events
    return response.data
  }
})

// Filtered data based on selected date
const filteredData = computed(() => {
  if (!allCalendarsData.value?.data) return []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (!selectedDate.value) {
    // Show only today and future events
    return allCalendarsData.value.data.filter((calendar: any) => {
      const eventDate = new Date(calendar.event_date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= today
    })
  }

  // If a date is selected, show events for that date (even if it's in the past)
  return allCalendarsData.value.data.filter((calendar: any) => {
    if (!selectedDate.value) return false;
    const eventDate = new Date(calendar.event_date)
    return eventDate.toDateString() === selectedDate.value.toDateString()
  })
})

// Calendar navigation
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

// Current month/year display
const currentMonthYear = computed(() => {
  const monthNames = getMonthNames(locale.value)
  return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
})

// Generate calendar days
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const isCurrentMonth = date.getMonth() === month
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = selectedDate.value && date.toDateString() === selectedDate.value.toDateString()
    
    // Count events for this date
    let eventCount = 0
    if (allCalendarsData.value?.data) {
      eventCount = allCalendarsData.value.data.filter((calendar: any) => {
        const eventDate = new Date(calendar.event_date)
        return eventDate.toDateString() === date.toDateString()
      }).length
    }
    
    days.push({
      key: date.toISOString(),
      date: date,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday,
      isSelected,
      eventCount
    })
  }
  
  return days
})

// Date selection
const selectDate = (date: Date) => {
  selectedDate.value = new Date(date)
}

// Clear filter
const clearDateFilter = () => {
  selectedDate.value = null
}


</script>

<style scoped>
.calendar-wrapper {
  font-family: system-ui, -apple-system, sans-serif;
}

.calendar-grid {
  user-select: none;
}
</style> 