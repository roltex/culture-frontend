import { useQuery } from '@tanstack/vue-query'
import api from '@/services/api'

export interface Settings {
  id: number
  key: string
  value: string
  type: string
  created_at: string
  updated_at: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  working_hours: string
}

export interface SocialMedia {
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  linkedin?: string
}

export const useSettings = () => {
  const getSettings = () => {
    return useQuery({
      queryKey: ['settings'],
      queryFn: async () => {
        const response = await api.get('/settings/')
        return response.data.data
      }
    })
  }

  const getContactInfo = () => {
    return useQuery({
      queryKey: ['settings', 'contact'],
      queryFn: async () => {
        const response = await api.get('/settings/contact')
        return response.data.data as ContactInfo
      }
    })
  }

  const getSocialMedia = () => {
    return useQuery({
      queryKey: ['settings', 'social'],
      queryFn: async () => {
        const response = await api.get('/settings/social')
        return response.data.data as SocialMedia
      }
    })
  }

  return {
    getSettings,
    getContactInfo,
    getSocialMedia
  }
} 