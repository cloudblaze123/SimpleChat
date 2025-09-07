import { createRouter, createWebHistory } from 'vue-router'
import Debug from '@/views/Debug.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/debug'
    },
    {
      path: '/debug',
      name: 'debug',
      component: Debug
    }
  ],
})

export default router
