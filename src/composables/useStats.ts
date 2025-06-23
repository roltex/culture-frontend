import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'

export interface Stats {
  projects: number
  competitions: number // Will map from active_competitions
  vacancies: number    // Will map from active_vacancies
  institutions: number
}

export const useStats = () => {
  const getStats = () => {
    return useQuery<Stats>({
      queryKey: ['stats'],
      queryFn: async () => {
        const response = await api.get('/stats')
        // Map backend keys to frontend keys
        return {
          projects: response.data.projects,
          competitions: response.data.active_competitions,
          vacancies: response.data.active_vacancies,
          institutions: response.data.institutions,
        }
      },
      staleTime: 0,
      refetchOnWindowFocus: true,
    })
  }
  return { getStats }
} 