import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'
import { Ref, computed } from 'vue'

export interface News {
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
  is_published: boolean
  published_at: string
  views_count: number
  created_at: string
  updated_at: string
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface PaginationLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  links: PaginationLinks
  meta: PaginationMeta
}

// Helper function to get localized content
export const getLocalizedContent = (content: { ka: string; en: string }, locale: string = 'ka') => {
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

export const useNews = () => {
  const getNews = (page: number = 1) => {
    return useQuery({
      queryKey: ['news', page],
      queryFn: async () => {
        const response = await api.get(`/news?page=${page}`)
        return response.data as PaginatedResponse<News>
      }
    })
  }

  const getLatestNews = () => {
    return useQuery({
      queryKey: ['news', 'latest'],
      queryFn: async () => {
        const response = await api.get('/news?per_page=20')
        return response.data.data as News[]
      }
    })
  }

  const getFeaturedNews = () => {
    return useQuery({
      queryKey: ['news', 'featured'],
      queryFn: async () => {
        const response = await api.get('/news/featured')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as News[]
      }
    })
  }

  const getNewsBySlug = (slug: Ref<string> | string) => {
    const slugValue = computed(() => {
      if (typeof slug === 'string') return slug
      return slug.value
    })

    return useQuery({
      queryKey: ['news', 'slug', slugValue],
      queryFn: async () => {
        const response = await api.get(`/news/${slugValue.value}`)
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as News
      },
      enabled: !!slugValue.value
    })
  }

  return {
    getNews,
    getLatestNews,
    getFeaturedNews,
    getNewsBySlug
  }
} 