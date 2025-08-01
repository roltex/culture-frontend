<template>
  <section class="py-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Content Area -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-primary to-primary-dark px-6 py-8 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-3xl font-bold tracking-tight">
                    {{ t('calendars.upcomingEvents') }}
                  </h2>
                  <p class="mt-2 text-primary-100">
                    {{ t('calendars.description') }}
                  </p>
                </div>
                <div class="text-right">
                  <div class="text-4xl font-bold">{{ upcomingEventsCount }}</div>
                  <div class="text-sm text-primary-100">{{ t('calendars.events') }}</div>
                </div>
              </div>
            </div>

            <!-- Events List -->
            <div class="p-6">
              <div v-if="isLoading" class="space-y-4">
                <!-- Skeleton loading -->
                <div v-for="n in 3" :key="n" class="animate-pulse">
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="upcomingEvents.length > 0" class="space-y-4">
                <div 
                  v-for="event in upcomingEvents.slice(0, 3)" 
                  :key="event.id"
                  class="group cursor-pointer"
                >
                  <router-link :to="`/kalendari/${event.slug}`" class="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <!-- Event Image -->
                    <div class="flex-shrink-0">
                      <img 
                        :src="getImageUrl(event.featured_image) || '/placeholder-event.jpg'" 
                        :alt="getLocalizedContent(event.title, locale)"
                        class="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                    
                    <!-- Event Details -->
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                        {{ getLocalizedContent(event.title, locale) }}
                      </h3>
                      <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                        {{ getLocalizedContent(event.excerpt, locale) }}
                      </p>
                      <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <div class="flex items-center space-x-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{{ formatEventDate(event.event_date, locale) }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{{ formatEventTime(event.event_date, locale) }}</span>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('calendars.noEvents') }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ t('calendars.noEventsDescription') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Calendar Widget -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ t('calendars.title') }}</h3>
            
            <!-- Mini Calendar -->
            <div class="calendar-mini">
              <div class="calendar-header flex items-center justify-between mb-4">
                <button 
                  @click="previousMonth"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h4 class="text-sm font-medium text-gray-900">
                  {{ currentMonthYear }}
                </h4>
                <button 
                  @click="nextMonth"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Calendar Grid -->
              <div class="calendar-grid-mini">
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
                    :class="[
                      'relative p-1 text-center text-xs cursor-pointer rounded transition-colors min-h-[28px] flex flex-col items-center justify-center',
                      day.isCurrentMonth 
                        ? 'hover:bg-blue-50' 
                        : 'text-gray-300',
                      day.isToday 
                        ? 'bg-blue-100 text-blue-900' 
                        : 'text-gray-900'
                    ]"
                  >
                    <span>{{ day.dayNumber }}</span>
                    <!-- Event Count Badge -->
                    <div 
                      v-if="day.eventCount > 0 && day.isCurrentMonth" 
                      class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {{ day.eventCount > 3 ? '3+' : day.eventCount }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- View All Button -->
              <div class="mt-4">
                <router-link 
                  to="/kalendari"
                  class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  {{ t('message.viewAll') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuery } from '@tanstack/vue-query'
import { useCalendars, getLocalizedContent, type Calendar } from '@/composables/useCalendars'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatEventDate, formatEventTime, getMonthNames, getWeekdayNames } from '@/utils/dateUtils'
import api from '@/services/api'

const { t, locale } = useI18n()

// Calendar state
const currentDate = ref(new Date())

// Get upcoming events
const { data: allCalendarsData, isLoading } = useQuery({
  queryKey: ['upcoming-calendars'],
  queryFn: async () => {
    const response = await api.get('/calendars?per_page=10')
    return response.data
  }
})

// Filter upcoming events (next 30 days)
const upcomingEvents = computed(() => {
  if (!allCalendarsData.value?.data) return []
  
  const today = new Date()
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
  
  return allCalendarsData.value.data
    .filter((event: Calendar) => {
      const eventDate = new Date(event.event_date)
      return eventDate >= today && eventDate <= thirtyDaysFromNow
    })
    .sort((a: Calendar, b: Calendar) => {
      return new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    })
})

const upcomingEventsCount = computed(() => upcomingEvents.value.length)

// Week days
const weekDays = computed(() => getWeekdayNames(locale.value))

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
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const isCurrentMonth = date.getMonth() === month
    const isToday = date.toDateString() === today.toDateString()
    
    // Count events for this date
    let eventCount = 0
    if (allCalendarsData.value?.data) {
      eventCount = allCalendarsData.value.data.filter((event: Calendar) => {
        const eventDate = new Date(event.event_date)
        return eventDate.toDateString() === date.toDateString()
      }).length
    }
    
    days.push({
      key: date.toISOString(),
      date: date,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday,
      eventCount
    })
  }
  
  return days
})

// Calendar navigation
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}
</script>

<style scoped>
.calendar-mini {
  font-family: system-ui, -apple-system, sans-serif;
}

.calendar-grid-mini {
  user-select: none;
}
</style> 