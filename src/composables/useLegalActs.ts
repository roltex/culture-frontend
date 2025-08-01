import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'
import { computed } from 'vue'
import type { Ref } from 'vue'

export interface LegalAct {
  id: number
  title: {
    ka: string
    en: string
  }
  description: {
    ka: string
    en: string
  }
  slug: string
  is_published: boolean
  published_at: string
  attachments: Array<{
    file_path: string
    url: string
  }>
  created_at: string
  updated_at: string
}

export interface LegalActsResponse {
  data: LegalAct[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
}

// Helper function to get localized content
export const getLocalizedContent = (content: { ka: string; en: string }, locale: string): string => {
  if (!content) return ''
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

export const useLegalActs = () => {
  const getLegalActs = (page: Ref<number> = computed(() => 1)) => {
    return useQuery({
      queryKey: ['legal-acts', page],
      queryFn: async () => {
        const response = await api.get('/legal-acts', {
          params: {
            page: page.value
          }
        })
        // Paginated response is wrapped in data property
        return response.data as LegalActsResponse
      }
    })
  }

  const getLegalAct = (slug: Ref<string>) => {
    return useQuery({
      queryKey: ['legal-act', slug],
      queryFn: async () => {
        const response = await api.get(`/legal-acts/${slug.value}`)
        // Single legal act is wrapped in data property
        return response.data.data as LegalAct
      },
      enabled: computed(() => !!slug.value)
    })
  }

  return {
    getLegalActs,
    getLegalAct,
    getLocalizedContent
  }
} 