import { useQuery } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { computed, type Ref, isRef } from 'vue'
import api from '@/services/api'

export interface Page {
  id: number
  title: {
    ka: string
    en: string
  }
  content: {
    ka: string
    en: string
  }
  slug: string
  photo?: string
  social_links: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    linkedin?: string
    telegram?: string
  }
  attachments: Array<{
    file_path: string
    url: string
  }>
  created_at: string
  updated_at: string
}

export function usePages() {
  const { locale } = useI18n()

  const getPageBySlug = (slug: string | Ref<string>) => {
    // Convert to computed if it's a ref, otherwise create a computed from the string
    const slugRef = isRef(slug) ? slug : computed(() => slug)
    
    return useQuery({
      queryKey: computed(() => ['page', slugRef.value, locale.value]),
      queryFn: async (): Promise<Page> => {
        const response = await api.get(`/pages/${slugRef.value}`)
        return response.data.data
      },
      enabled: computed(() => !!slugRef.value)
    })
  }

  const getPages = () => {
    return useQuery({
      queryKey: ['pages', locale.value],
      queryFn: async (): Promise<{ data: Page[] }> => {
        const response = await api.get('/pages')
        return response.data
      }
    })
  }

  const getFeaturedPages = () => {
    return useQuery({
      queryKey: ['featured-pages', locale.value],
      queryFn: async (): Promise<{ data: Page[] }> => {
        const response = await api.get('/pages/featured')
        return response.data
      }
    })
  }

  return {
    getPageBySlug,
    getPages,
    getFeaturedPages
  }
} 