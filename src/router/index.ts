import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/NewsView.vue'),
  },
  {
    path: '/news/page/:page',
    name: 'NewsPage',
    component: () => import('@/views/NewsView.vue'),
    props: true,
  },
  {
    path: '/news/:slug',
    name: 'NewsDetail',
    component: () => import('@/views/NewsDetailView.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/projects/:slug',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetailView.vue'),
  },
  {
    path: '/competitions',
    name: 'Competitions',
    component: () => import('@/views/CompetitionsView.vue'),
  },
  {
    path: '/vacancies',
    name: 'Vacancies',
    component: () => import('@/views/VacanciesView.vue'),
  },
  {
    path: '/legislation',
    name: 'Legislation',
    component: () => import('@/views/LegislationView.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyView.vue'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/TermsView.vue'),
  },
  {
    path: '/institutions',
    name: 'SubordinateInstitutions',
    component: () => import('@/views/SubordinateInstitutionsView.vue'),
  },
  {
    path: '/institutions/:id',
    name: 'SubordinateInstitutionDetail',
    component: () => import('@/views/SubordinateInstitutionDetailView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    
    // For all other navigation, scroll to top
    return { top: 0 }
  }
})

export default router
