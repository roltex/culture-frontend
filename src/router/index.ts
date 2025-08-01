import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/siakhleebi',
    name: 'News',
    component: () => import('@/views/NewsView.vue'),
  },
  {
    path: '/siakhleebi/:slug',
    name: 'NewsDetail',
    component: () => import('@/views/NewsDetailView.vue'),
  },
  {
    path: '/kalendari',
    name: 'Calendars',
    component: () => import('@/views/CalendarsView.vue'),
  },
  {
    path: '/kalendari/:slug',
    name: 'CalendarDetail',
    component: () => import('@/views/CalendarDetailView.vue'),
  },
  {
    path: '/proeqtebi',
    name: 'Projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/proeqtebi/:slug',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetailView.vue'),
  },
  {
    path: '/konkursebi',
    name: 'Competitions',
    component: () => import('@/views/CompetitionsView.vue'),
  },
  {
    path: '/konkursebi/:slug',
    name: 'CompetitionDetail',
    component: () => import('@/views/CompetitionDetailView.vue'),
  },
  {
    path: '/vakansiebi',
    name: 'Vacancies',
    component: () => import('@/views/VacanciesView.vue'),
  },
  {
    path: '/vakansiebi/:slug',
    name: 'VacancyDetail',
    component: () => import('@/views/VacancyDetailView.vue'),
  },
  {
    path: '/kanonmdebloba',
    name: 'Legislation',
    component: () => import('@/views/LegislationView.vue'),
  },
  {
    path: '/kanonmdebloba/:slug',
    name: 'LegislationDetail',
    component: () => import('@/views/LegislationDetailView.vue'),
  },
  {
    path: '/kontaqti',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
  },
  {
    path: '/:slug',
    name: 'Page',
    component: () => import('@/views/PageView.vue'),
    props: true,
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
    path: '/ssipebi',
    name: 'SubordinateInstitutions',
    component: () => import('@/views/SubordinateInstitutionsView.vue'),
  },
  {
    path: '/ssipebi/:slug',
    name: 'SubordinateInstitutionDetail',
    component: () => import('@/views/SubordinateInstitutionDetailView.vue'),
  },
  {
    path: '/sheskidvebi',
    name: 'Procurements',
    component: () => import('@/views/ProcurementsView.vue'),
  },
  {
    path: '/sheskidvebi/:slug',
    name: 'ProcurementDetail',
    component: () => import('@/views/ProcurementDetailView.vue'),
  },
  {
    path: '/samartlebrivi-aktebi',
    name: 'LegalActs',
    component: () => import('@/views/LegalActsView.vue'),
  },
  {
    path: '/samartlebrivi-aktebi/:slug',
    name: 'LegalActDetail',
    component: () => import('@/views/LegalActDetailView.vue'),
  },
  {
    path: '/angarishebi',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue'),
  },
  {
    path: '/angarishebi/:slug',
    name: 'ReportDetail',
    component: () => import('@/views/ReportDetailView.vue'),
  },
  {
    path: '/admin/menus',
    name: 'MenuManagement',
    component: () => import('@/views/MenuManagementView.vue'),
  },
  {
    path: '/saministros-struqtura',
    name: 'MinistryStructure',
    component: () => import('../views/MinistryStructureView.vue'),
  },
  {
    path: '/ministris-moadgileebi',
    name: 'DeputyMinisters',
    component: () => import('@/views/DeputyMinistersView.vue'),
  },
  {
    path: '/ministris-moadgileebi/:id',
    name: 'DeputyMinisterDetail',
    component: () => import('@/views/DeputyMinisterDetailView.vue'),
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
