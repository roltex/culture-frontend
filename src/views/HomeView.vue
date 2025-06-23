<template>
  <div class="min-h-screen">
    <HeroNewsSlider />
    <StatisticsSection />
    <LatestNews />
    <ProjectsSection />
    <CompetitionsSection />
    <InstitutionsCarousel />
  </div>
</template>

<script setup lang="ts">
import HeroNewsSlider from '@/components/home/HeroNewsSlider.vue'
import LatestNews from '@/components/home/LatestNews.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import CompetitionsSection from '@/components/home/CompetitionsSection.vue'
import InstitutionsCarousel from '@/components/home/InstitutionsCarousel.vue'
import StatisticsSection from '@/components/home/StatisticsSection.vue'

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style> 