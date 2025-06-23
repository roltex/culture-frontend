import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'

export interface Competition {
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
  excerpt?: {
    ka: string
    en: string
  }
  slug: string
  prize_amount?: string | number
  featured_image?: string
  status?: string
  category?: string
  max_participants?: number
  contact_email?: string
  contact_phone?: string
  application_deadline: string
  is_active: boolean
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

// Helper function to get localized content
export const getLocalizedContent = (content: { ka: string; en: string }, locale: string = 'ka') => {
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

export const useCompetitions = () => {
  const getCompetitions = () => {
    return useQuery({
      queryKey: ['competitions'],
      queryFn: async () => {
        const response = await api.get('/competitions')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as Competition[]
      }
    })
  }

  const getCompetitionsWithMeta = () => {
    return useQuery({
      queryKey: ['competitions', 'with-meta'],
      queryFn: async () => {
        const response = await api.get('/competitions')
        return response.data
      }
    })
  }

  const getActiveCompetitions = () => {
    return useQuery({
      queryKey: ['competitions', 'active'],
      queryFn: async () => {
        const response = await api.get('/competitions/active')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as Competition[]
      }
    })
  }

  const getCompetitionBySlug = (slug: string) => {
    return useQuery({
      queryKey: ['competitions', slug],
      queryFn: async () => {
        const response = await api.get(`/competitions/${slug}`)
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as Competition
      },
      enabled: !!slug
    })
  }

  return {
    getCompetitions,
    getCompetitionsWithMeta,
    getActiveCompetitions,
    getCompetitionBySlug
  }
} 