import { createRouter, createWebHistory } from 'vue-router'
import VerificationPage from '../views/VerificationPage.vue'
import SettingsView from '../views/settings/SettingsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/full/FullLayout.vue'),
      meta: {
        auth: true
      },
       redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboardMain',
          component: () => import('@/views/dashboard/DashboardView.vue')
        },
        {
          path: 'addstudent',
          name: 'addstudent',
          component: () => import('@/views/dashboard/AddStudent.vue')
        },
        {
          path: 'database',
          name: 'database',
          component: () => import('@/views/dashboard/DatabaseView.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          redirect: '/settings/account',
          component: SettingsView,
          children: [
            {
              path: 'account',
              name: 'account',
              component: () => import('@/views/settings/AccountView.vue')
            },
            {
              path: 'notifications',
              name: 'notifications',
              component: () => import('@/views/settings/NotificationsView.vue')
            },
            {
              path: 'security',
              name: 'security',
              component: () => import('@/views/settings/SecurityView.vue')
            },
            

          ]
        }
      ]
    },
    {
      path: '/verification',
      name: 'verification',
      component: VerificationPage
    }
  ]
})


export default router
