import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'
import { computed } from 'vue'
import type { Ref } from 'vue'

export interface Legislation {
  id: number
  title: {
    ka: string
    en: string
  }
  description: {
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
  } | null
  slug: string
  document_type: {
    ka: string
    en: string
  }
  act_number: string
  adoption_date: string
  effective_date: string
  status: string | null
  featured_image: string | null
  featured_image_url: string | null
  document_file: string | null
  document_file_ka: string | null
  document_file_en: string | null
  document_url: string | null
  document_url_ka: string | null
  document_url_en: string | null
  is_published: boolean
  published_at: string
  download_count: number
  created_at: string
  updated_at: string
}

export interface LegislationResponse {
  data: Legislation[]
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

// Helper function to get localized content
export const getLocalizedContent = (content: { ka: string; en: string }, locale: string): string => {
  if (!content) return ''
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

export const useLegislation = () => {
  const getLegislation = (page: Ref<number> = computed(() => 1)) => {
    return useQuery({
      queryKey: ['legislation', page],
      queryFn: async () => {
        const response = await api.get('/legislation', {
          params: {
            page: page.value
          }
        })
        // Paginated response is wrapped in data property
        return response.data as LegislationResponse
      }
    })
  }

  const getLegislationBySlug = (slug: Ref<string>) => {
    return useQuery({
      queryKey: ['legislation', slug],
      queryFn: async () => {
        const response = await api.get(`/legislation/${slug.value}`)
        // Single legislation is wrapped in data property
        return response.data.data as Legislation
      },
      enabled: computed(() => !!slug.value)
    })
  }

  const getLegislationCategories = () => {
    return useQuery({
      queryKey: ['legislation-categories'],
      queryFn: async () => {
        const response = await api.get('/legislation/categories')
        return response.data.data as Record<string, string>
      }
    })
  }

  return {
    getLegislation,
    getLegislationBySlug,
    getLegislationCategories,
    getLocalizedContent
  }
} 