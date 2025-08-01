import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'

export interface OtherStructure {
  id: number
  title: {
    ka: string
    en: string
  }
  image: string | null
  link: string | null
  created_at: string
  updated_at: string
}

export const useOtherStructures = () => {
  const getOtherStructures = () => {
    return useQuery({
      queryKey: ['other-structures'],
      queryFn: async (): Promise<OtherStructure[]> => {
        const response = await axios.get('/other-structures')
        return response.data.data || response.data
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }

  return {
    getOtherStructures,
  }
}

export const getLocalizedContent = (content: { ka: string; en: string } | null, locale: string): string => {
  if (!content) return ''
  return content[locale as keyof typeof content] || content.ka || content.en || ''
} 