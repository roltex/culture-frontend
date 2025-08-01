import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'
import { computed } from 'vue'
import type { Ref } from 'vue'

export interface Procurement {
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

export interface ProcurementsResponse {
  data: Procurement[]
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

export const useProcurements = () => {
  const getProcurements = (page: Ref<number> = computed(() => 1)) => {
    return useQuery({
      queryKey: ['procurements', page],
      queryFn: async () => {
        const response = await api.get('/procurements', {
          params: {
            page: page.value
          }
        })
        // Paginated response is wrapped in data property
        return response.data as ProcurementsResponse
      }
    })
  }

  const getProcurement = (slug: Ref<string>) => {
    return useQuery({
      queryKey: ['procurement', slug],
      queryFn: async () => {
        const response = await api.get(`/procurements/${slug.value}`)
        // Single procurement is wrapped in data property
        return response.data.data as Procurement
      },
      enabled: computed(() => !!slug.value)
    })
  }

  return {
    getProcurements,
    getProcurement,
    getLocalizedContent
  }
} 