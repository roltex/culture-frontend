import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'

export interface SubordinateInstitution {
  id: number
  name: {
    ka: string
    en: string
  }
  description: {
    ka: string
    en: string
  }
  mission: {
    ka: string
    en: string
  }
  vision: {
    ka: string
    en: string
  }
  slug: string
  type: string
  status: string
  director_name: string
  establishment_year: string
  logo: string | null
  website_url: string | null
  email: string | null
  phone: string | null
  address: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  is_published: boolean
  is_featured: boolean
  published_at: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Helper function to get localized content
export const getLocalizedContent = (content: { ka: string; en: string }, locale: string = 'ka') => {
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

export const useSubordinateInstitutions = () => {
  const getSubordinateInstitutions = () => {
    return useQuery({
      queryKey: ['subordinate-institutions'],
      queryFn: async () => {
        const response = await api.get('/subordinate-institutions')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as SubordinateInstitution[]
      }
    })
  }

  const getSubordinateInstitutionsWithMeta = () => {
    return useQuery({
      queryKey: ['subordinate-institutions', 'with-meta'],
      queryFn: async () => {
        const response = await api.get('/subordinate-institutions')
        return response.data
      }
    })
  }

  const getFeaturedSubordinateInstitutions = () => {
    return useQuery({
      queryKey: ['subordinate-institutions', 'featured'],
      queryFn: async () => {
        const response = await api.get('/subordinate-institutions/featured')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as SubordinateInstitution[]
      }
    })
  }

  const getSubordinateInstitutionById = (id: number) => {
    return useQuery({
      queryKey: ['subordinate-institutions', id],
      queryFn: async () => {
        const response = await api.get(`/subordinate-institutions/${id}`)
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as SubordinateInstitution
      },
      enabled: !!id
    })
  }

  const getSubordinateInstitutionBySlug = (slug: string) => {
    return useQuery({
      queryKey: ['subordinate-institutions', 'slug', slug],
      queryFn: async () => {
        const response = await api.get(`/subordinate-institutions/slug/${slug}`)
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as SubordinateInstitution
      },
      enabled: !!slug
    })
  }

  const getSubordinateInstitutionsByType = (type: string) => {
    return useQuery({
      queryKey: ['subordinate-institutions', 'type', type],
      queryFn: async () => {
        const response = await api.get(`/subordinate-institutions/type/${type}`)
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as SubordinateInstitution[]
      },
      enabled: !!type
    })
  }

  const getSubordinateInstitutionTypes = () => {
    return useQuery({
      queryKey: ['subordinate-institutions', 'types'],
      queryFn: async () => {
        const response = await api.get('/subordinate-institutions/types')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data)
      }
    })
  }

  return {
    getSubordinateInstitutions,
    getSubordinateInstitutionsWithMeta,
    getFeaturedSubordinateInstitutions,
    getSubordinateInstitutionById,
    getSubordinateInstitutionBySlug,
    getSubordinateInstitutionsByType,
    getSubordinateInstitutionTypes
  }
} 