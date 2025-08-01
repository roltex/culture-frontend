<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="pageQuery.isLoading.value" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">{{ t('common.loading') }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="pageQuery.isError.value" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto p-8">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ t('common.error') }}</h4>
        <p class="text-gray-600 mb-6">{{ t('common.error_loading') }}</p>
          <button 
            @click="pageQuery.refetch()"
          class="inline-flex items-center px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            {{ t('common.tryAgain') }}
          </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="page" class="min-h-screen bg-gray-50">
      <!-- Header Section -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex items-center space-x-4">
            
          </div>
          
          <div class="mt-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                  {{ getLocalizedTitle(page) }}
                </h1>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12">
            
            <!-- Sidebar -->
            <aside class="lg:col-span-4 p-6 border-r border-gray-200">
              <div class="space-y-6">
                <!-- Featured Image -->
                <div v-if="page.photo">
                  <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      :src="getImageUrl(page.photo)" 
                      :alt="getLocalizedTitle(page)"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <!-- Social links -->
                <div v-if="hasSocialLinks(page)" class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ t('common.followUs') }}
                  </h3>
                  <div class="flex space-x-4">
                    <a 
                      v-if="page.social_links.facebook"
                      :href="page.social_links.facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a 
                      v-if="page.social_links.twitter"
                      :href="page.social_links.twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a 
                      v-if="page.social_links.instagram"
                      :href="page.social_links.instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-pink-600 hover:text-pink-800 transition-colors"
                    >
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.163-1.297-.49-.422-.327-.49-.807-.49-1.297s.068-.97.49-1.297c.422-.327.807-.49 1.297-.49s.875.163 1.297.49c.422.327.49.807.49 1.297s-.068.97-.49 1.297c-.422.327-.807.49-1.297.49z"/>
                      </svg>
                    </a>
                    <a 
                      v-if="page.social_links.youtube"
                      :href="page.social_links.youtube"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a 
                      v-if="page.social_links.linkedin"
                      :href="page.social_links.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-700 hover:text-blue-900 transition-colors"
                    >
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                      </svg>
                    </a>
                    <a 
                      v-if="page.social_links.telegram"
                      :href="page.social_links.telegram"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                              <!-- Attachments -->
              <div v-if="pageAttachments.length > 0" class="space-y-4">
                <AttachmentViewer :attachments="pageAttachments" />
              </div>
              </div>
            </aside>

            <!-- Page Content -->
            <article class="lg:col-span-8 p-6 md:p-8">
              <!-- Content -->
              <div class="prose prose-lg max-w-none">
                <div v-html="getLocalizedContent(page)" class="text-gray-800 leading-relaxed"></div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { usePages, type Page } from '@/composables/usePages'
import { getImageUrl } from '@/utils/getImageUrl'
import AttachmentViewer from '@/components/common/AttachmentViewer.vue'

const { t, locale } = useI18n()
const route = useRoute()

// Get the page slug from the route
const slug = computed(() => route.params.slug as string)

// Fetch page data
const { getPageBySlug } = usePages()
const pageQuery = getPageBySlug(slug)

// Get the page data
const page = computed(() => pageQuery.data.value)

// Map page attachments to the expected format for AttachmentViewer
const pageAttachments = computed(() =>
  page.value?.attachments?.map(att => ({
    name: getFileName(att.file_path),
    url: att.url,
    size: 0 // Default size since page attachments do not have a size
  })) || []
)

// Helper functions
const getLocalizedTitle = (page: Page | undefined) => {
  if (!page || !page.title) return '';
  let currentLocale: 'ka' | 'en' = 'en';
  if (locale.value.startsWith('ka')) currentLocale = 'ka';
  else if (locale.value.startsWith('en')) currentLocale = 'en';
  
  return page.title[currentLocale] || page.title.ka || page.title.en || '';
}

const getLocalizedContent = (page: Page | undefined) => {
  if (!page || !page.content) return '';
  let currentLocale: 'ka' | 'en' = 'en';
  if (locale.value.startsWith('ka')) currentLocale = 'ka';
  else if (locale.value.startsWith('en')) currentLocale = 'en';
  
  return page.content[currentLocale] || page.content.ka || page.content.en || '';
}

const hasSocialLinks = (page: Page | undefined) => {
  if (!page || !page.social_links) return false;
  return Object.values(page.social_links).some(link => link);
}

const getFileName = (filePath: string) => {
  return filePath.split('/').pop() || filePath
}

</script> 