<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('menu.management') }}</h1>
        <p class="text-gray-600">{{ $t('menu.description') }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="mb-6 flex justify-between items-center">
        <div class="flex space-x-4">
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            {{ $t('menu.create') }}
          </button>
        </div>
      </div>

      <!-- Loading and Error States -->
      <div v-if="isLoading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-red-600 text-center py-8">
        {{ $t('common.error') }}
      </div>

      <!-- Menu Tree -->
      <div v-else class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-4">{{ $t('menu.structure') }}</h2>
        <div class="space-y-2">
          <div
            v-for="menu in rootMenus"
            :key="menu.id"
            class="menu-item group"
            draggable="true"
            @dragstart="onDragStart($event, menu)"
            @dragover="onDragOver($event)"
            @drop="onDrop($event, menu)"
          >
            <div class="menu-item-content">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-all duration-200 group-hover:translate-x-1">
                <div class="flex items-center gap-3">
                  <div class="drag-handle cursor-move text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                    </svg>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="menu.icon" class="text-lg">{{ menu.icon }}</span>
                    <span class="font-medium">{{ menu.label[currentLocale as 'ka' | 'en'] }}</span>
                    <span v-if="!menu.is_active" class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      {{ $t('menu.inactive') }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    @click="editMenu(menu)"
                    class="text-blue-600 hover:text-blue-800 p-1 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteMenu(menu)"
                    class="text-red-600 hover:text-red-800 p-1 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Children -->
              <div v-if="menu.children && menu.children.length > 0" class="ml-8 mt-2 space-y-2">
                <div
                  v-for="child in menu.children"
                  :key="child.id"
                  class="menu-item group"
                  draggable="true"
                  @dragstart="onDragStart($event, child)"
                  @dragover="onDragOver($event)"
                  @drop="onDrop($event, child)"
                >
                  <div class="menu-item-content">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-all duration-200 group-hover:translate-x-1">
                      <div class="flex items-center gap-3">
                        <div class="drag-handle cursor-move text-gray-400 hover:text-gray-600 transition-colors duration-200">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                          </svg>
                        </div>
                        <div class="flex items-center gap-2">
                          <span v-if="child.icon" class="text-lg">{{ child.icon }}</span>
                          <span class="font-medium">{{ child.label[currentLocale as 'ka' | 'en'] }}</span>
                          <span v-if="!child.is_active" class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            {{ $t('menu.inactive') }}
                          </span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <button
                          @click="editMenu(child)"
                          class="text-blue-600 hover:text-blue-800 p-1 transition-colors duration-200"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button
                          @click="deleteMenu(child)"
                          class="text-red-600 hover:text-red-800 p-1 transition-colors duration-200"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <MenuModal
      v-if="showCreateModal || editingMenu"
      :menu="editingMenu"
      :menu-types="menuTypes"
      :menu-targets="menuTargets"
      @close="closeModal"
      @save="saveMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMenus, type MenuItem } from '@/composables/useMenus'
import MenuModal from '@/components/MenuModal.vue'

const { t, locale } = useI18n()
const { menus, isLoading, error, refetch, menuTypes, menuTargets } = useMenus()

const showCreateModal = ref(false)
const editingMenu = ref<MenuItem | null>(null)
const draggedItem = ref<MenuItem | null>(null)

const currentLocale = computed(() => locale.value)

const rootMenus = computed(() => {
  return menus.value?.filter(menu => !menu.parent_id && menu.is_active) || []
})

const editMenu = (menu: MenuItem) => {
  editingMenu.value = menu
}

const deleteMenu = async (menu: MenuItem) => {
  if (confirm(t('menu.confirmDelete'))) {
    try {
      // TODO: Implement delete API call
      await refetch()
    } catch (error) {
      console.error('Error deleting menu:', error)
    }
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingMenu.value = null
}

const saveMenu = async (menuData: Partial<MenuItem>) => {
  try {
    // TODO: Implement save API call
    await refetch()
    closeModal()
  } catch (error) {
    console.error('Error saving menu:', error)
  }
}

// Drag and Drop handlers
const onDragStart = (event: DragEvent, menu: MenuItem) => {
  draggedItem.value = menu
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = async (event: DragEvent, targetMenu: MenuItem) => {
  event.preventDefault()
  
  if (!draggedItem.value || draggedItem.value.id === targetMenu.id) {
    return
  }

  try {
    // TODO: Implement reorder API call
    await refetch()
  } catch (error) {
    console.error('Error reordering menu:', error)
  }
  
  draggedItem.value = null
}
</script> 