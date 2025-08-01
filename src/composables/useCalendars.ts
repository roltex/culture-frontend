import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'

export interface Calendar {
  id: number
  title: {
    ka: string
    en: string
  }
  content: {
    ka: string
    en: string
  }
  excerpt: {
    ka: string
    en: string
  }
  slug: string
  featured_image: string | null
  gallery: string[]
  attachments: string[]
  is_published: boolean
  published_at: string
  event_date: string
  views_count: number
  created_at: string
  updated_at: string
}

export interface CalendarsResponse {
  success: boolean
  data: Calendar[]
  meta: {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
  }
}

export interface CalendarResponse {
  success: boolean
  data: Calendar
}

export interface CalendarsListResponse {
  success: boolean
  data: Calendar[]
}

// Helper function to get localized content
export const getLocalizedContent = (content: { ka: string; en: string }, locale: string = 'ka') => {
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

export function useCalendars(page = 1) {
  return useQuery({
    queryKey: ['calendars', page],
    queryFn: async (): Promise<CalendarsResponse> => {
      const response = await api.get(`/calendars?page=${page}`)
      return response.data
    }
  })
}

import { Ref, computed } from 'vue'

export function useCalendar(slug: Ref<string> | string) {
  const slugValue = computed(() => {
    if (typeof slug === 'string') return slug
    return slug.value
  })

  return useQuery({
    queryKey: ['calendar', 'slug', slugValue],
    queryFn: async (): Promise<CalendarResponse> => {
      const response = await api.get(`/calendars/${slugValue.value}`)
      return response.data
    },
    enabled: !!slugValue.value
  })
}

export function useFeaturedCalendars() {
  return useQuery({
    queryKey: ['featured-calendars'],
    queryFn: async (): Promise<CalendarsListResponse> => {
      const response = await api.get('/calendars/featured')
      return response.data
    }
  })
}

export function useUpcomingCalendars() {
  return useQuery({
    queryKey: ['upcoming-calendars'],
    queryFn: async (): Promise<CalendarsListResponse> => {
      const response = await api.get('/calendars/upcoming')
      return response.data
    }
  })
}

export function useNearEventsByDate(eventDate: string) {
  return useQuery({
    queryKey: ['near-events', eventDate],
    queryFn: async (): Promise<CalendarsListResponse> => {
      const response = await api.get(`/calendars/near-by-date?date=${eventDate}`)
      return response.data
    },
    enabled: !!eventDate
  })
} 