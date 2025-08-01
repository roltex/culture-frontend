<template>
  <a
    v-if="institution.website_url"
    :href="institution.website_url"
    target="_blank"
    rel="noopener noreferrer"
    class="bg-white p-6 flex flex-col items-center justify-center text-center h-48 rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
  >
    <img :src="fullLogoUrl" :alt="institutionName" class="h-20 object-contain mb-4" />
    <h3 class="text-sm font-semibold text-gray-800">{{ institutionName }}</h3>
  </a>
  <router-link
    v-else
    :to="`/ssipebi/${institution.slug}`"
    class="bg-white p-6 flex flex-col items-center justify-center text-center h-48 rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
  >
    <img :src="fullLogoUrl" :alt="institutionName" class="h-20 object-contain mb-4" />
    <h3 class="text-sm font-semibold text-gray-800">{{ institutionName }}</h3>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SubordinateInstitution } from '@/composables/useSubordinateInstitutions';
import { useI18n } from 'vue-i18n';
import { getImageUrl } from '@/utils/getImageUrl';

const { locale } = useI18n();

const props = defineProps<{
  institution: SubordinateInstitution;
}>();

const institutionName = computed(() => {
  return props.institution.name[locale.value as keyof typeof props.institution.name] ?? props.institution.name.ka;
});

const fullLogoUrl = computed(() => {
  return getImageUrl(props.institution.logo) || '/logo.png';
});
</script>

<style scoped>
/* You can add component-specific styles here if needed */
</style> 