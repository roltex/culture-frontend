<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="bg-gray-50 min-h-screen">
      <!-- Compact Header Section Skeleton -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="max-w-4xl">
            <!-- Title skeleton -->
            <div class="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <!-- Meta skeleton -->
            <div class="flex items-center space-x-4">
              <div class="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area Skeleton -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Event Content Skeleton -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Image Carousel Skeleton -->
            <div class="mb-8 pb-6 border-b border-gray-200">
              <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            
            <!-- Content paragraphs skeleton -->
            <div class="space-y-6">
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
              
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
            
            <!-- Social Share Skeleton -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="h-6 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
              <div class="flex items-center space-x-4">
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </article>

          <!-- Sidebar Skeleton -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <div class="h-8 bg-gray-200 rounded w-32 mx-6 mt-6 mb-4 animate-pulse"></div>
              <div class="divide-y divide-gray-200">
                <!-- Related events items skeleton -->
                <div v-for="n in 3" :key="n" class="flex items-start space-x-4 p-6">
                  <div class="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 animate-pulse"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="flex justify-center items-center h-screen">
      <div class="text-center max-w-md mx-auto">
        <h3 class="text-2xl font-semibold text-gray-800">{{ t('message.error') }}</h3>
        <p class="mt-2 text-gray-600">{{ error?.message }}</p>
        <div class="mt-8">
          <router-link
            to="/kalendari"
            class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {{ t('calendars.backToCalendars') }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Event Page Layout -->
    <div v-else-if="event">
      <!-- Compact Header Section -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="max-w-4xl">
            <h1 class="text-xl md:text-2xl font-semibold text-gray-900 leading-tight mb-2">
              {{ localizedTitle }}
            </h1>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formattedEventDate }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ formattedEventTime }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{{ event.views_count }} {{ t('calendars.views') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          
          <!-- Event Content -->
          <article class="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden p-6 md:p-8">
            <!-- Image Carousel -->
            <div v-if="carouselImages.length > 0" class="mb-8 pb-6 border-b border-gray-200">
              <ImageCarousel 
                :images="carouselImages" 
                :title="localizedTitle"
              />
            </div>
            
            <div class="prose prose-lg max-w-none" v-html="localizedContent"></div>
            
            <!-- Attachments -->
            <AttachmentViewer :attachments="calendarAttachments" />
            
            <!-- Social Share -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ t('calendars.share') }}</h3>
              <div class="flex items-center space-x-4">
                <button @click="shareOnFacebook" title="Share on Facebook" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button @click="shareOnTwitter" title="Share on Twitter" class="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                 <button @click="shareOnLinkedIn" title="Share on LinkedIn" class="text-gray-400 hover:text-blue-700 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </button>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-4 mt-10 lg:mt-0 lg:sticky top-24 self-start">
            <div class="bg-white rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold text-gray-900 px-6 pt-6 pb-4">{{ t('calendars.nearEvents') }}</h3>
              <ul v-if="nearEvents.length" class="divide-y divide-gray-200">
                <li v-for="nearEvent in nearEvents" :key="nearEvent.id" class="group">
                  <router-link :to="`/kalendari/${nearEvent.slug}`" class="flex items-start space-x-4 p-6 hover:bg-gray-50 transition-colors">
                    <img :src="getImageUrl(nearEvent.featured_image) || '/placeholder-event.jpg'" :alt="getLocalizedContent(nearEvent.title, locale)" class="w-20 h-20 rounded-lg object-cover flex-shrink-0">
                    <div class="flex-1">
                      <p class="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {{ getLocalizedContent(nearEvent.title, locale) }}
                      </p>
                      <p class="text-sm text-gray-600 mt-2 line-clamp-2">
                        {{ getLocalizedContent(nearEvent.excerpt, locale) }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ formatEventDateLocalized(nearEvent.event_date, locale, 'short') }}
                      </p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCalendar, useCalendars, getLocalizedContent, type Calendar } from '@/composables/useCalendars'
import { getImageUrl } from '@/utils/getImageUrl'
import { formatEventTime, formatEventDateLocalized } from '@/utils/dateUtils'
import ImageCarousel from '@/components/common/ImageCarousel.vue'
import AttachmentViewer from '@/components/common/AttachmentViewer.vue'

const { t, locale } = useI18n()
const route = useRoute()

const slug = computed(() => route.params.slug as string)

// Debug info
console.log('Current slug:', slug.value)

const { 
  isLoading, 
  isError, 
  data: eventResponse, 
  error
} = useCalendar(slug)

// Debug info
console.log('Event loading:', isLoading.value)
console.log('Event error:', isError.value)
console.log('Event data:', eventResponse.value)

const event = computed(() => eventResponse.value?.data)
const { data: allCalendarsData } = useCalendars()
const nearEvents = ref<Calendar[]>([])

// Carousel images for the component
const carouselImages = computed(() => {
  const images = []
  if (event.value?.featured_image) {
    const featuredUrl = getImageUrl(event.value.featured_image)
    console.log('Featured image URL:', featuredUrl)
    images.push(featuredUrl)
  }
  if (event.value?.gallery) {
    const galleryUrls = event.value.gallery.map((img: string) => getImageUrl(img))
    console.log('Gallery image URLs:', galleryUrls)
    images.push(...galleryUrls)
  }
  console.log('All carousel images:', images)
  return images
})

const shareUrl = computed(() => window.location.href)
const shareTitle = computed(() => localizedTitle.value)

const shareOnFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`, '_blank', 'noopener,noreferrer')
}
const shareOnTwitter = () => {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(shareTitle.value)}`, '_blank', 'noopener,noreferrer')
}
const shareOnLinkedIn = () => {
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(shareTitle.value)}`, '_blank', 'noopener,noreferrer')
}

watchEffect(() => {
  if (allCalendarsData.value?.data && event.value) {
    const currentEventDate = new Date(event.value.event_date)
    const currentEventTime = currentEventDate.getTime()
    
    nearEvents.value = allCalendarsData.value.data
      .filter((item: Calendar) => {
        // Exclude current event
        if (item.id === event.value?.id) return false
        
        // Get event date
        const itemDate = new Date(item.event_date)
        const itemTime = itemDate.getTime()
        
        // Show events within 30 days before or after current event
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000
        return Math.abs(itemTime - currentEventTime) <= thirtyDaysInMs
      })
      .sort((a: Calendar, b: Calendar) => {
        // Sort by date closest to current event
        const aDate = new Date(a.event_date).getTime()
        const bDate = new Date(b.event_date).getTime()
        return Math.abs(aDate - currentEventTime) - Math.abs(bDate - currentEventTime)
      })
      .slice(0, 5)
  }
})

const localizedTitle = computed(() => event.value ? getLocalizedContent(event.value.title, locale.value) : '')
const localizedContent = computed(() => event.value ? getLocalizedContent(event.value.content, locale.value) : '')

// Transform calendar attachments from array of strings to array of objects
const calendarAttachments = computed(() => {
  if (!event.value?.attachments || !Array.isArray(event.value.attachments)) {
    return []
  }
  
  return event.value.attachments.map((attachmentUrl: string) => ({
    url: attachmentUrl,
    name: attachmentUrl.split('/').pop() || 'document',
    size: 0 // Default size since we don't have it from the API
  }))
})



const formattedEventDate = computed(() => {
  if (!event.value) return ''
  return formatEventDateLocalized(event.value.event_date, locale.value, 'short')
})

const formattedEventTime = computed(() => {
  if (!event.value) return ''
  return formatEventTime(event.value.event_date, locale.value)
})
</script> 