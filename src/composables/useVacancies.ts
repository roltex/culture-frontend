import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'

export interface Vacancy {
  id: number
  title: {
    ka: string
    en: string
  }
  description: {
    ka: string
    en: string
  }
  requirements?: {
    ka: string
    en: string
  }
  slug: string
  application_deadline: string
  department?: string
  location?: {
    ka: string
    en: string
  }
  salary_range?: string
  salary_min?: number
  salary_max?: number
  application_form_url?: string
  employment_type?: string
  contact_email?: string
  contact_phone?: string
  start_date?: string
  duration?: string
  application_form?: string
  is_active: boolean
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
  attachments?: Array<{
    file_path: string
    url: string
  }>
}

export const useVacancies = () => {
  const getVacancies = () => {
    return useQuery({
      queryKey: ['vacancies'],
      queryFn: async () => {
        const response = await api.get('/vacancies')
        return response.data.data as Vacancy[]
      }
    })
  }

  const getVacanciesWithMeta = () => {
    return useQuery({
      queryKey: ['vacancies', 'with-meta'],
      queryFn: async () => {
        console.log('Fetching vacancies...')
        const response = await api.get('/vacancies')
        console.log('Vacancies response:', response.data)
        return response.data
      },
      staleTime: 0,
      refetchOnWindowFocus: true,
    })
  }

  const getActiveVacancies = () => {
    return useQuery({
      queryKey: ['vacancies', 'active'],
      queryFn: async () => {
        const response = await api.get('/vacancies/active')
        return response.data.data as Vacancy[]
      }
    })
  }

  const getVacancyBySlug = (slug: string) => {
    return useQuery({
      queryKey: ['vacancies', slug],
      queryFn: async () => {
        const response = await api.get(`/vacancies/${slug}`)
        return response.data.data as Vacancy
      },
      enabled: !!slug
    })
  }

  return {
    getVacancies,
    getVacanciesWithMeta,
    getActiveVacancies,
    getVacancyBySlug
  }
} 