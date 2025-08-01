<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSubordinateInstitutions } from '@/composables/useSubordinateInstitutions'
import { getImageUrl } from '@/utils/getImageUrl'

const { t, locale } = useI18n()
const route = useRoute()

// Get slug from route
const slug = computed(() => route.params.slug as string)

// Query institution by slug
const { getSubordinateInstitutionBySlug } = useSubordinateInstitutions()
const query = getSubordinateInstitutionBySlug(slug.value)

// Refetch if navigating to a new slug in the same component instance
watch(slug, newSlug => newSlug && query.refetch())

// Data and error helpers
const errMsg = computed(() =>
  query.error.value ? query.error.value.message : t('message.error')
)

// Show content when not loading and data exists
const showContent = computed(() => !query.isLoading.value && !!query.data.value)

// Localization helpers
const L = (obj?: { ka:string; en:string }) =>
  obj ? obj[locale.value as 'ka'|'en'] || obj.ka || obj.en : ''

const typeLabel = (type?: string) => {
  if (!type) return ''
  const m: Record<string,string> = {
    museum: t('institutions.types.museum'),
    educational: t('institutions.types.educational'),
    theater: t('institutions.types.theater'),
    ministry: t('institutions.types.ministry'),
    film: t('institutions.types.film'),
    youth: t('institutions.types.youth'),
    archives: t('institutions.types.archives'),
    library: t('institutions.types.library'),
    medical: t('institutions.types.medical'),
    tourism: t('institutions.types.tourism'),
    academy: t('institutions.types.academy')
  }
  return m[type] || type
}


</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Skeleton Loader -->
    <div v-if="query.isLoading.value" class="bg-gray-50 min-h-screen">
      <div class="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
        <div class="absolute inset-0 bg-gray-700"></div>
        <div class="relative max-w-4xl mx-auto text-center">
          <div class="space-y-4">
            <div class="h-12 bg-gray-600 rounded mx-auto max-w-2xl animate-pulse"></div>
            <div class="h-8 bg-gray-600 rounded mx-auto max-w-xl animate-pulse"></div>
          </div>
          <div class="mt-6 flex items-center justify-center space-x-4">
            <div class="h-6 bg-gray-600 rounded w-32 animate-pulse"></div>
            <div class="text-gray-500">&bull;</div>
            <div class="h-6 bg-gray-600 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
          <div class="space-y-6">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
          <div class="mt-8 h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="query.isError.value" class="flex justify-center items-center h-screen">
      <div class="text-center max-w-md mx-auto">
        <h3 class="text-2xl font-semibold text-gray-800">{{ t('message.error') }}</h3>
        <p class="mt-2 text-gray-600">{{ errMsg }}</p>
        <div class="mt-8">
          <router-link
            to="/ssipebi"
            class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {{ t('message.backToInstitutions') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="showContent" class="bg-gray-50">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-4 py-8">
          <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <!-- Logo -->
            <div v-if="query.data.value?.logo" class="flex-shrink-0">
              <img 
                :src="getImageUrl(query.data.value.logo)" 
                :alt="L(query.data.value.name)"
                class="w-24 h-24 lg:w-32 lg:h-32 object-contain rounded-lg shadow-sm"
              />
            </div>
            
            <!-- Title and Meta -->
            <div class="text-center lg:text-left flex-1">
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {{ L(query.data.value?.name) }}
              </h1>
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                  {{ typeLabel(query.data.value?.type) }}
                </span>
                <span v-if="query.data.value?.establishment_year" class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ t('message.established') }} {{ query.data.value.establishment_year }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Description -->
            <div v-if="query.data.value?.description" class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="p-6 md:p-8">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ t('institutions.about') }}</h2>
                <div class="prose prose-lg max-w-none text-gray-700" v-html="L(query.data.value.description)" />
              </div>
            </div>

            <!-- Mission & Vision -->
            <div v-if="query.data.value?.mission || query.data.value?.vision" class="grid md:grid-cols-2 gap-6">
              <div v-if="query.data.value?.mission" class="bg-white rounded-xl shadow-sm overflow-hidden">
                <div class="p-6 md:p-8">
                  <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ t('institutions.mission') }}
                  </h2>
                  <p class="text-gray-700 leading-relaxed">{{ L(query.data.value.mission) }}</p>
                </div>
              </div>
              
              <div v-if="query.data.value?.vision" class="bg-white rounded-xl shadow-sm overflow-hidden">
                <div class="p-6 md:p-8">
                  <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ t('institutions.vision') }}
                  </h2>
                  <p class="text-gray-700 leading-relaxed">{{ L(query.data.value.vision) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Contact Info -->
            <div v-if="query.data.value?.director_name || query.data.value?.address || query.data.value?.phone || query.data.value?.email" 
                 class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ t('institutions.contactInfo') }}
                </h3>
                <div class="space-y-3">
                  <div v-if="query.data.value?.director_name" class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.director') }}</p>
                      <p class="text-sm text-gray-600">{{ query.data.value.director_name }}</p>
                    </div>
                  </div>
                  
                  <div v-if="query.data.value?.address" class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.address') }}</p>
                      <p class="text-sm text-gray-600">{{ query.data.value.address }}</p>
                    </div>
                  </div>
                  
                  <div v-if="query.data.value?.phone" class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.phone') }}</p>
                      <a :href="`tel:${query.data.value.phone}`" class="text-sm text-blue-600 hover:underline">
                        {{ query.data.value.phone }}
                      </a>
                    </div>
                  </div>
                  
                  <div v-if="query.data.value?.email" class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ t('message.email') }}</p>
                      <a :href="`mailto:${query.data.value.email}`" class="text-sm text-blue-600 hover:underline">
                        {{ query.data.value.email }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Website Link -->
            <div v-if="query.data.value?.website_url" class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('message.website') }}</h3>
                <a :href="query.data.value.website_url" 
                   target="_blank" 
                   rel="noopener"
                   class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {{ t('message.visitWebsite') }}
                </a>
              </div>
            </div>

            <!-- Social Media -->
            <div v-if="query.data.value?.facebook || query.data.value?.instagram || query.data.value?.twitter" 
                 class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('message.socialMedia') }}</h3>
                <div class="flex space-x-4">
                  <a v-if="query.data.value?.facebook" 
                     :href="query.data.value.facebook" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="text-blue-600 hover:text-blue-800 transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a v-if="query.data.value?.instagram" 
                     :href="query.data.value.instagram" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="text-pink-600 hover:text-pink-800 transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.163-1.297-.49-.422-.327-.49-.807-.49-1.297s.068-.97.49-1.297c.422-.327.807-.49 1.297-.49s.875.163 1.297.49c.422.327.49.807.49 1.297s-.068.97-.49 1.297c-.422.327-.807.49-1.297.49z"/>
                    </svg>
                  </a>
                  <a v-if="query.data.value?.twitter" 
                     :href="query.data.value.twitter" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="text-blue-400 hover:text-blue-600 transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Data State -->
    <div v-else class="flex justify-center items-center h-screen">
      <div class="text-center max-w-md mx-auto">
        <h3 class="text-2xl font-semibold text-gray-800">{{ t('message.notFound') }}</h3>
        <p class="mt-2 text-gray-600">{{ t('institutions.notFound') }}</p>
        <div class="mt-8">
          <router-link
            to="/ssipebi"
            class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {{ t('message.backToInstitutions') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* optional styles */
</style> 