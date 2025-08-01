import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'
import { Ref, computed } from 'vue'

export interface ProjectAttachment {
  url: string
  name: string
  size: number
}

export interface Project {
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
  slug: string
  status: 'planned' | 'ongoing' | 'completed'
  start_date: string
  end_date: string
  featured_image: string | null
  gallery: string[]
  attachments: ProjectAttachment[]
  is_featured: boolean
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
  budget: number | null
  location: string | null
}

// Helper function to get localized content
export const getLocalizedContent = (content: { ka: string; en: string }, locale: string = 'ka') => {
  return content[locale as keyof typeof content] || content.ka || content.en || ''
}

export const useProjects = () => {
  const getProjects = () => {
    return useQuery({
      queryKey: ['projects'],
      queryFn: async () => {
        const response = await api.get('/projects')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as Project[]
      }
    })
  }

  const getProjectsWithMeta = () => {
    return useQuery({
      queryKey: ['projects', 'with-meta'],
      queryFn: async () => {
        const response = await api.get('/projects')
        return response.data
      }
    })
  }

  const getFeaturedProjects = () => {
    return useQuery({
      queryKey: ['projects', 'featured'],
      queryFn: async () => {
        const response = await api.get('/projects/featured')
        // The API returns {data: [...]} structure
        return response.data.data as Project[]
      }
    })
  }

  const getProjectBySlug = (slug: Ref<string> | string) => {
    const slugValue = computed(() => {
      if (typeof slug === 'string') return slug
      return slug.value
    })

    return useQuery({
      queryKey: ['projects', 'slug', slugValue],
      queryFn: async () => {
        const response = await api.get(`/projects/${slugValue.value}`)
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data) as Project
      },
      enabled: !!slugValue.value
    })
  }

  const getProjectStatuses = () => {
    return useQuery({
      queryKey: ['projects', 'statuses'],
      queryFn: async () => {
        const response = await api.get('/projects/statuses')
        // Handle both wrapped and unwrapped responses
        return (response.data.data || response.data)
      }
    })
  }

  return {
    getProjects,
    getProjectsWithMeta,
    getFeaturedProjects,
    getProjectBySlug,
    getProjectStatuses
  }
} 