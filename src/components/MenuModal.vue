<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ menu ? $t('menu.edit') : $t('menu.create') }}
          </h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Language Tabs -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                type="button"
                @click="activeTab = 'ka'"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'ka'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                ქართული
              </button>
              <button
                type="button"
                @click="activeTab = 'en'"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'en'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                English
              </button>
            </nav>
          </div>

          <!-- Label Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.label') }} ({{ activeTab === 'ka' ? 'ქართული' : 'English' }})
            </label>
            <input
              v-model="formData.label[activeTab]"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('menu.labelPlaceholder')"
            />
          </div>

          <!-- URL Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.url') }}
            </label>
            <input
              v-model="formData.url"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('menu.urlPlaceholder')"
            />
          </div>

          <!-- Icon Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.icon') }}
            </label>
            <input
              v-model="formData.icon"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('menu.iconPlaceholder')"
            />
          </div>

          <!-- Type Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.type') }}
            </label>
            <select
              v-model="formData.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option v-for="(label, value) in menuTypes" :key="value" :value="value">
                {{ label }}
              </option>
            </select>
          </div>

          <!-- Page Slug (for page type) -->
          <div v-if="formData.type === 'page'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.pageSlug') }}
            </label>
            <input
              v-model="formData.page_slug"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('menu.pageSlugPlaceholder')"
            />
          </div>

          <!-- Target Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.target') }}
            </label>
            <select
              v-model="formData.target"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option v-for="(label, value) in menuTargets" :key="value" :value="value">
                {{ label }}
              </option>
            </select>
          </div>

          <!-- Parent Menu Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.parent') }}
            </label>
            <select
              v-model="formData.parent_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option :value="null">{{ $t('menu.noParent') }}</option>
              <option v-for="parentMenu in availableParents" :key="parentMenu.id" :value="parentMenu.id">
                {{ parentMenu.label[currentLocale as 'ka' | 'en'] }}
              </option>
            </select>
          </div>

          <!-- Sort Order -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('menu.sortOrder') }}
            </label>
            <input
              v-model.number="formData.sort_order"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Active Toggle -->
          <div class="flex items-center">
            <input
              v-model="formData.is_active"
              type="checkbox"
              id="is_active"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="is_active" class="ml-2 block text-sm text-gray-900">
              {{ $t('menu.active') }}
            </label>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ $t('common.cancel') }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ menu ? $t('common.update') : $t('common.create') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMenus, type MenuItem } from '@/composables/useMenus'

interface Props {
  menu?: MenuItem | null
  menuTypes?: Record<string, string>
  menuTargets?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  menu: null,
  menuTypes: () => ({}),
  menuTargets: () => ({})
})

const emit = defineEmits<{
  close: []
  save: [menuData: Partial<MenuItem>]
}>()

const { locale } = useI18n()
const { menus } = useMenus()

const activeTab = ref<'ka' | 'en'>('ka')
const currentLocale = computed(() => locale.value)

const formData = ref({
  label: {
    ka: '',
    en: ''
  },
  url: '',
  icon: '',
  type: 'link' as 'link' | 'page' | 'external',
  page_slug: '',
  target: '_self' as '_self' | '_blank',
  parent_id: undefined as number | undefined,
  sort_order: 0,
  is_active: true
})

const availableParents = computed(() => {
  if (!menus.value) return []
  return menus.value.filter(m => m.id !== props.menu?.id)
})

onMounted(() => {
  if (props.menu) {
    formData.value = {
      label: { ...props.menu.label },
      url: props.menu.url,
      icon: props.menu.icon || '',
      type: props.menu.type,
      page_slug: props.menu.page_slug || '',
      target: props.menu.target,
      parent_id: props.menu.parent_id || undefined,
      sort_order: props.menu.sort_order,
      is_active: props.menu.is_active
    }
  }
})

const handleSubmit = () => {
  emit('save', formData.value)
}
</script> 