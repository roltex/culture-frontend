<template>
  <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <!-- Top Bar -->
    <div class="bg-[#0f2340] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-10 text-xs">
          <!-- Top Bar Left -->
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ contactInfo?.email || 'info@culture.gov.ge' }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{{ contactInfo?.phone || '+995 32 2 000 000' }}</span>
            </div>
          </div>

          <!-- Top Bar Right -->
          <div class="flex items-center space-x-4">
            <!-- Social Links -->
            <div class="flex items-center space-x-3">
              <a v-if="socialMedia?.facebook" :href="socialMedia.facebook" target="_blank" rel="noopener noreferrer" class="hover:text-blue-200 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a v-if="socialMedia?.instagram" :href="socialMedia.instagram" target="_blank" rel="noopener noreferrer" class="hover:text-blue-200 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.163-1.297-.49-.422-.327-.49-.807-.49-1.297s.068-.97.49-1.297c.422-.327.807-.49 1.297-.49s.875.163 1.297.49c.422.327.49.807.49 1.297s-.068.97-.49 1.297c-.422.327-.807.49-1.297.49z"/>
                </svg>
              </a>
              <a v-if="socialMedia?.twitter" :href="socialMedia.twitter" target="_blank" rel="noopener noreferrer" class="hover:text-blue-200 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a v-if="socialMedia?.youtube" :href="socialMedia.youtube" target="_blank" rel="noopener noreferrer" class="hover:text-blue-200 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a v-if="socialMedia?.linkedin" :href="socialMedia.linkedin" target="_blank" rel="noopener noreferrer" class="hover:text-blue-200 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
            </div>

            <!-- Language Switcher -->
            <button
              @click="toggleLanguage"
              class="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium hover:bg-primary-dark transition-all duration-200 rounded-md cursor-pointer"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span class="text-sm">{{ currentLocale === 'ka' ? '🇬🇪' : '🇺🇸' }}</span>
              <span class="hidden sm:inline font-medium">{{ currentLocale === 'ka' ? 'ქართული' : 'English' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-4">
            <div class="relative">
              <img 
                src="/logo.png" 
                alt="Ministry of Culture and Sport" 
                class="h-12 w-auto"
              />
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1">
          <router-link 
            v-for="item in navigationItems" 
            :key="item.path"
            :to="item.path"
            class="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg transition-all duration-200 hover:bg-primary-10 group uppercase tracking-wide"
            active-class="bg-primary-10"
          >
            {{ t(item.label) }}
            <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-3/4"></span>
          </router-link>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Button -->
          <button
            @click="toggleSearch"
            class="hidden md:flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Contact Button -->
          <router-link
            to="/contact"
            class="hidden md:inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {{ t('message.contact') }}
          </router-link>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Search Bar (Hidden by default) -->
      <div v-if="searchOpen" class="pb-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('header.searchPlaceholder')"
            class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            @keyup.enter="performSearch"
          />
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            @click="toggleSearch"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="lg:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="text-gray-700 hover:text-primary hover:bg-primary/10 block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 uppercase tracking-wide"
            active-class="bg-primary text-white"
          >
            {{ t(item.label) }}
          </router-link>
          
          <!-- Mobile Contact Button -->
          <router-link
            to="/contact"
            @click="mobileMenuOpen = false"
            class="mt-4 inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {{ t('message.contact') }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettings } from '@/composables/useSettings'

const { t, locale } = useI18n()
const { getContactInfo, getSocialMedia } = useSettings()

const mobileMenuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

// Get dynamic settings
const contactInfoQuery = getContactInfo()
const socialMediaQuery = getSocialMedia()

const contactInfo = computed(() => contactInfoQuery.data.value)
const socialMedia = computed(() => socialMediaQuery.data.value)

const currentLocale = computed(() => locale.value)

const navigationItems = [
  { path: '/', label: 'message.home' },
  { path: '/news', label: 'message.news' },
  { path: '/projects', label: 'message.projects' },
  { path: '/competitions', label: 'message.competitions' },
  { path: '/vacancies', label: 'message.vacancies' },
  { path: '/legislation', label: 'message.legislation' },
  { path: '/institutions', label: 'message.institutions' }
]

const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'ka' ? 'en' : 'ka'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    searchOpen.value = false
  }
}

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    mobileMenuOpen.value = false
    // Focus the search input after a short delay
    setTimeout(() => {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    }, 100)
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // You can implement search functionality here
    console.log('Searching for:', searchQuery.value)
    searchQuery.value = ''
    searchOpen.value = false
  }
}
</script> 