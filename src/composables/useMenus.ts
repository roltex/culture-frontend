import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import api from '@/services/api'

export interface MenuItem {
  id: number
  label: {
    ka: string
    en: string
  }
  url: string
  icon?: string
  target: '_self' | '_blank'
  type: 'link' | 'page' | 'external'
  page_slug?: string
  sort_order: number
  is_active: boolean
  children?: MenuItem[]
  parent_id?: number
  has_parent: boolean
  has_children: boolean
  children_count: number
  created_at: string
  updated_at: string
}

export function useMenus() {
  const { locale } = useI18n()
  
  const { data: menusResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['menus', locale.value],
    queryFn: async (): Promise<{ data: MenuItem[] }> => {
      const response = await api.get('/menus')
      return response.data
    }
  })

  const { data: menuTreeResponse, isLoading: treeLoading } = useQuery({
    queryKey: ['menus-tree', locale.value],
    queryFn: async (): Promise<{ data: MenuItem[] }> => {
      const response = await api.get('/menus/tree')
      return response.data
    }
  })

  const { data: menuTypes } = useQuery({
    queryKey: ['menu-types'],
    queryFn: async () => {
      const response = await api.get('/menus/types')
      return response.data
    }
  })

  const { data: menuTargets } = useQuery({
    queryKey: ['menu-targets'],
    queryFn: async () => {
      const response = await api.get('/menus/targets')
      return response.data
    }
  })

  // Extract the actual menus array from the response
  const menus = computed(() => menusResponse.value?.data || [])
  const menuTree = computed(() => menuTreeResponse.value?.data || [])

  const activeMenus = computed(() => {
    return menus.value?.filter(menu => menu.is_active) || []
  })

  const rootMenus = computed(() => {
    return activeMenus.value.filter(menu => !menu.parent_id && menu.id !== 34)
  })

  const getMenuById = (id: number): MenuItem | undefined => {
    const findMenu = (items: MenuItem[]): MenuItem | undefined => {
      for (const item of items) {
        if (item.id === id) return item
        if (item.children) {
          const found = findMenu(item.children)
          if (found) return found
        }
      }
      return undefined
    }
    return findMenu(menus.value || [])
  }

  const getMenuPath = (id: number): MenuItem[] => {
    const path: MenuItem[] = []
    const findPath = (items: MenuItem[], targetId: number): boolean => {
      for (const item of items) {
        path.push(item)
        if (item.id === targetId) return true
        if (item.children && findPath(item.children, targetId)) return true
        path.pop()
      }
      return false
    }
    findPath(menus.value || [], id)
    return path
  }

  const flattenMenus = (items: MenuItem[]): MenuItem[] => {
    const result: MenuItem[] = []
    const flatten = (menuItems: MenuItem[]) => {
      for (const item of menuItems) {
        result.push(item)
        if (item.children) {
          flatten(item.children)
        }
      }
    }
    flatten(items)
    return result
  }

  return {
    menus,
    menuTree,
    menuTypes,
    menuTargets,
    activeMenus,
    rootMenus,
    isLoading,
    treeLoading,
    error,
    refetch,
    getMenuById,
    getMenuPath,
    flattenMenus
  }
} 