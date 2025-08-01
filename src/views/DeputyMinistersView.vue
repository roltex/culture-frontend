<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900">
            {{ $t('deputyMinisters.title') }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Skeleton Cards -->
          <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="animate-pulse">
              <div class="h-48 bg-gray-200"></div>
              <div class="p-6">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div class="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
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

      <!-- Deputy Ministers Grid -->
      <div v-else-if="deputyMinisters && deputyMinisters.length > 0" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="deputyMinister in deputyMinisters"
            :key="deputyMinister.id"
            class="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="navigateToDetail(deputyMinister.id)"
          >
            <!-- Image -->
            <div class="relative overflow-hidden mb-4">
              <img
                :src="getImageUrl(deputyMinister.photo) || '/placeholder-news.jpg'"
                :alt="deputyMinister.full_name"
                class="w-full h-64 object-cover object-top transition-transform duration-300 ease-in-out hover:scale-105"
                @error="onImageError($event)"
              />
            </div>
            <!-- Content -->
            <div class="flex-grow flex flex-col p-6">
              <h3 class="text-lg font-bold text-slate-800 mb-2 line-clamp-2 leading-tight">
                {{ getLocalizedName(deputyMinister) }}
              </h3>
              <p class="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {{ getLocalizedDescription(deputyMinister) }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-500 text-lg mb-4">
          {{ $t('deputyMinisters.noDeputyMinisters') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useDeputyMinistersQuery } from '@/composables/useDeputyMinisters';
import { getImageUrl } from '@/utils/getImageUrl';

const { t, locale } = useI18n();
const router = useRouter();

const { data: deputyMinisters, isLoading, error, refetch } = useDeputyMinistersQuery();

const getLocalizedDescription = (deputyMinister) => {
  return deputyMinister.description?.[locale.value] || 
         deputyMinister.description?.ka || 
         deputyMinister.description?.en || 
         '';
};

const getLocalizedName = (deputyMinister) => {
  const firstName = deputyMinister.first_name?.[locale.value] || 
                   deputyMinister.first_name?.ka || 
                   deputyMinister.first_name?.en || 
                   '';
  const lastName = deputyMinister.last_name?.[locale.value] || 
                  deputyMinister.last_name?.ka || 
                  deputyMinister.last_name?.en || 
                  '';
  
  return `${firstName} ${lastName}`.trim();
};

const navigateToDetail = (id) => {
  router.push(`/ministris-moadgileebi/${id}`);
};

function onImageError(event) {
  event.target.src = '/placeholder-news.jpg';
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 