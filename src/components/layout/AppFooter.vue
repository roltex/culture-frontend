<template>
  <footer class="bg-slate-900 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
        <!-- Ministry Info - Takes up more space -->
        <div class="lg:col-span-4">
          <div class="flex items-center space-x-4 mb-8">
            <div>
              <img 
                src="/logo_white.png" 
                alt="Ministry of Culture and Sport" 
                class="h-12 w-auto"
              />
            </div>
          </div>
          
          <p class="text-slate-300 leading-relaxed mb-8 text-lg">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-4">
          <h4 class="text-xl font-bold text-white mb-6">{{ t('footer.quickLinks') }}</h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/siakhleebi" class="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center group">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ t('message.news') }}
              </router-link>
            </li>
            <li>
              <router-link to="/proeqtebi" class="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center group">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ t('message.projects') }}
              </router-link>
            </li>
            <li>
              <router-link to="/konkursebi" class="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center group">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ t('message.competitions') }}
              </router-link>
            </li>
            <li>
              <router-link to="/vacancies" class="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center group">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ t('message.vacancies') }}
              </router-link>
            </li>
            <li>
              <router-link to="/legislation" class="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center group">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ t('message.legislation') }}
              </router-link>
            </li>
            <li>
              <router-link to="/ssipebi" class="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center group">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ t('message.institutions') }}
              </router-link>
            </li>
            <li>
              <router-link to="/moatagleebi" class="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center group">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ t('deputyMinisters.title') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div class="lg:col-span-4">
          <!-- Contact Information -->
          <div class="space-y-4 mb-8">
            <div v-if="contactInfo?.address" class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-slate-300">{{ contactInfo.address }}</span>
            </div>
            <div v-if="contactInfo?.phone" class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span class="text-slate-300">{{ contactInfo.phone }}</span>
            </div>
            <div v-if="contactInfo?.email" class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-slate-300">{{ contactInfo.email }}</span>
            </div>
            <div v-if="contactInfo?.working_hours" class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-slate-300">{{ contactInfo.working_hours }}</span>
            </div>
          </div>
          
          <!-- Dynamic Social Media Links -->
          <div class="flex space-x-4">
            <a 
              v-if="socialMedia?.facebook"
              :href="socialMedia.facebook"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group"
            >
              <svg class="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              v-if="socialMedia?.instagram"
              :href="socialMedia.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group"
            >
              <svg class="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.163-1.297-.49-.422-.327-.49-.807-.49-1.297s.068-.97.49-1.297c.422-.327.807-.49 1.297-.49s.875.163 1.297.49c.422.327.49.807.49 1.297s-.068.97-.49 1.297c-.422.327-.807.49-1.297.49z"/>
              </svg>
            </a>
            <a 
              v-if="socialMedia?.twitter"
              :href="socialMedia.twitter"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group"
            >
              <svg class="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              v-if="socialMedia?.youtube"
              :href="socialMedia.youtube"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group"
            >
              <svg class="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              v-if="socialMedia?.linkedin"
              :href="socialMedia.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group"
            >
              <svg class="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-slate-400 text-sm">
            © {{ new Date().getFullYear() }} {{ t('message.hello') }}. {{ t('footer.rights') }}
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <router-link to="/privacy" class="text-slate-400 hover:text-white text-sm transition-colors duration-200 font-medium">
              {{ t('footer.privacy') }}
            </router-link>
            <router-link to="/terms" class="text-slate-400 hover:text-white text-sm transition-colors duration-200 font-medium">
              {{ t('footer.terms') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettings } from '@/composables/useSettings'

const { t } = useI18n()
const { getContactInfo, getSocialMedia } = useSettings()

// Get dynamic settings
const contactInfoQuery = getContactInfo()
const socialMediaQuery = getSocialMedia()

const contactInfo = computed(() => contactInfoQuery.data.value)
const socialMedia = computed(() => socialMediaQuery.data.value)
</script> 