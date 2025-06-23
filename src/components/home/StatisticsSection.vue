<template>
  <!-- Inspired by Saturn UI Library -->
  <section class="stats-section relative py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Left Column: Stat Cards -->
        <div class="relative lg:order-first z-10">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Skeleton Loader -->
            <template v-if="showSkeleton">
              <div v-for="n in 4" :key="n" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-5 animate-pulse">
                <div class="w-14 h-14 rounded-xl bg-gray-200 flex-shrink-0"></div>
                <div class="flex-1">
                  <div class="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                  <div class="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </template>
            <!-- Real Stats -->
            <template v-else>
              <!-- Projects Stat -->
              <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-center space-x-5">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center bg-red-100 flex-shrink-0">
                  <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">{{ t('home.stats.projects') }}</p>
                  <div class="counter text-3xl font-bold text-gray-900" :data-target="statsData.projects">0</div>
                </div>
              </div>
              <!-- Competitions Stat -->
              <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-center space-x-5">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-100 flex-shrink-0">
                  <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">{{ t('home.stats.competitions') }}</p>
                  <div class="counter text-3xl font-bold text-gray-900" :data-target="statsData.competitions">0</div>
                </div>
              </div>
              <!-- Vacancies Stat -->
              <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-center space-x-5">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center bg-green-100 flex-shrink-0">
                  <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path></svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">{{ t('home.stats.vacancies') }}</p>
                  <div class="counter text-3xl font-bold text-gray-900" :data-target="statsData.vacancies">0</div>
                </div>
              </div>
              <!-- Institutions Stat -->
              <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-center space-x-5">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center bg-purple-100 flex-shrink-0">
                  <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">{{ t('home.stats.institutions') }}</p>
                  <div class="counter text-3xl font-bold text-gray-900" :data-target="statsData.institutions">0</div>
                </div>
              </div>
            </template>
          </div>
        </div>
        
        <!-- Right Column: Text Content -->
        <div class="relative flex flex-col justify-center lg:text-right">
          <div class="relative">
            <h2 class="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl relative z-10">
              {{ t('home.stats.title_line_1') }}<br>{{ t('home.stats.title_line_2') }}
            </h2>
            <div class="absolute -top-8 -left-4 lg:left-auto lg:-right-4 z-0">
              <span class="text-7xl lg:text-8xl font-black text-slate-200/80 uppercase" style="letter-spacing: 0.1em;">
                {{ t('home.stats.background_text') }}
              </span>
            </div>
            <div class="w-16 h-1 bg-primary mt-4 lg:ml-auto"></div>
          </div>
          <p class="text-lg text-gray-600 max-w-lg mt-6 lg:ml-auto">
            {{ t('home.stats.subtitle') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStats } from '@/composables/useStats'

const { t } = useI18n()
const { getStats } = useStats()
const stats = getStats()

// Debug loading state
console.log('Stats loading state:', {
  isLoading: stats.isLoading.value,
  isFetching: stats.isFetching.value,
  hasData: !!stats.data.value,
  data: stats.data.value
})

const statsData = computed(() => {
  return {
    projects: stats.data.value?.projects ?? 0,
    competitions: stats.data.value?.competitions ?? 0,
    vacancies: stats.data.value?.vacancies ?? 0,
    institutions: stats.data.value?.institutions ?? 0,
  }
})

// Show skeleton when no data is available
const showSkeleton = computed(() => !stats.data.value)

onMounted(() => {
  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter')
    const speed = 200

    const animate = (counter: HTMLElement) => {
      const target = +(counter.getAttribute('data-target') || 0)
      const count = +counter.innerText
      const inc = target / speed

      if (count < target) {
        counter.innerText = Math.ceil(count + inc).toString()
        setTimeout(() => animate(counter), 1)
      } else {
        counter.innerText = target.toString()
      }
    }

    counters.forEach(counter => {
      animate(counter as HTMLElement)
    })
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Check if data is loaded and has values
        const checkDataAndAnimate = () => {
          const currentData = statsData.value
          const hasData = Object.values(currentData).some(val => val > 0)
          
          if (hasData) {
            setTimeout(animateCounters, 100) // Small delay for rendering
            observer.unobserve(entry.target)
          } else {
            // If no data yet, check again in 100ms
            setTimeout(checkDataAndAnimate, 100)
          }
        }
        
        checkDataAndAnimate()
      }
    })
  }, {
    threshold: 0.5
  })

  const statsSection = document.querySelector('.stats-section')
  if (statsSection) {
    observer.observe(statsSection)
  }
})
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style> 