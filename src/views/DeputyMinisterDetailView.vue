<template>
  <div class="deputy-minister-detail-page">
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="max-w-4xl mx-auto">
        <div class="animate-pulse">
          <div class="flex items-center space-x-6 mb-8">
            <div class="w-32 h-32 bg-gray-200 rounded-full"></div>
            <div class="flex-1">
              <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 text-lg mb-4">{{ error }}</div>
        <button @click="refetch" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          {{ $t('common.tryAgain') }}
        </button>
      </div>

      <!-- Deputy Minister Detail -->
      <div v-else-if="deputyMinister" class="max-w-4xl mx-auto">
        <!-- Header Section -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <div class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <!-- Photo -->
            <div class="flex-shrink-0">
              <img 
                v-if="deputyMinister.photo" 
                :src="getImageUrl(deputyMinister.photo)" 
                :alt="deputyMinister.full_name"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                @error="onImageError($event)"
              />
              <div v-else class="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 class="text-3xl font-bold text-gray-900 mb-2">
                    {{ getLocalizedFullName(deputyMinister) }}
                  </h1>
                  <p class="text-xl text-gray-600">
                    {{ $t('deputyMinisters.deputyMinister') }}
                  </p>
                </div>
                
                <!-- Social Media Icons -->
                <div v-if="hasSocialMedia" class="flex space-x-3 mt-4 md:mt-0">
                  <a 
                    v-if="deputyMinister.facebook_url" 
                    :href="deputyMinister.facebook_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Facebook"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="deputyMinister.twitter_url" 
                    :href="deputyMinister.twitter_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-400 hover:text-blue-600 transition-colors"
                    title="Twitter"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="deputyMinister.instagram_url" 
                    :href="deputyMinister.instagram_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-pink-600 hover:text-pink-800 transition-colors"
                    title="Instagram"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.163-1.297-.49-.422-.327-.49-.807-.49-1.297s.068-.97.49-1.297c.422-.327.807-.49 1.297-.49s.875.163 1.297.49c.422.327.49.807.49 1.297s-.068.97-.49 1.297c-.422.327-.807.49-1.297.49z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="deputyMinister.youtube_url" 
                    :href="deputyMinister.youtube_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-red-600 hover:text-red-800 transition-colors"
                    title="YouTube"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="deputyMinister.linkedin_url" 
                    :href="deputyMinister.linkedin_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-700 hover:text-blue-900 transition-colors"
                    title="LinkedIn"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="deputyMinister.telegram_url" 
                    :href="deputyMinister.telegram_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:text-blue-700 transition-colors"
                    title="Telegram"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Contact Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="deputyMinister.email" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a :href="`mailto:${deputyMinister.email}`" class="text-blue-600 hover:text-blue-800">
                    {{ deputyMinister.email }}
                  </a>
                </div>
                <div v-if="deputyMinister.phone" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a :href="`tel:${deputyMinister.phone}`" class="text-blue-600 hover:text-blue-800">
                    {{ deputyMinister.phone }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <div class="prose max-w-none">
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ getLocalizedDescription(deputyMinister) }}
            </p>
          </div>
        </div>



        <!-- Attachments Section -->
        <div v-if="deputyMinister.attachments && deputyMinister.attachments.length > 0" class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">
            {{ $t('deputyMinisters.attachments') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="attachment in deputyMinister.attachments" 
              :key="attachment.url"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <svg class="w-8 h-8 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ attachment.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatFileSize(attachment.size) }}
                </p>
              </div>
              <a 
                :href="attachment.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="ml-2 text-blue-600 hover:text-blue-800"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useDeputyMinisterQuery } from '@/composables/useDeputyMinisters';
import { getImageUrl } from '@/utils/getImageUrl';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();

const deputyMinisterId = computed(() => parseInt(route.params.id));
const { data: deputyMinister, isLoading, error, refetch } = useDeputyMinisterQuery(deputyMinisterId.value);

const getLocalizedFullName = (deputyMinister) => {
  const firstName = deputyMinister.first_name?.[locale.value] || 
                   deputyMinister.first_name?.ka || 
                   deputyMinister.first_name?.en || 
                   '';
  const lastName = deputyMinister.last_name?.[locale.value] || 
                  deputyMinister.last_name?.ka || 
                  deputyMinister.last_name?.en || 
                  '';
  
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else if (lastName) {
    return lastName;
  }
  
  // Fallback to full_name if available
  return deputyMinister.full_name || '';
};

const getLocalizedDescription = (deputyMinister) => {
  return deputyMinister.description?.[locale.value] || 
         deputyMinister.description?.ka || 
         deputyMinister.description?.en || 
         '';
};

const hasSocialMedia = computed(() => {
  if (!deputyMinister.value) return false;
  return deputyMinister.value.facebook_url || 
         deputyMinister.value.twitter_url || 
         deputyMinister.value.instagram_url || 
         deputyMinister.value.youtube_url || 
         deputyMinister.value.linkedin_url || 
         deputyMinister.value.telegram_url;
});

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

function onImageError(event) {
  event.target.style.display = 'none';
  event.target.nextElementSibling.style.display = 'flex';
}
</script> 