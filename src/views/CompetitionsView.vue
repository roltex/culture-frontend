<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ $t('message.competitions') }}
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ $t('competitions.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="text-gray-500 text-lg">
          {{ $t('common.comingSoon') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script> 