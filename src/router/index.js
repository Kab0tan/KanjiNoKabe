import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KanjiView from '../views/KanjiView/KanjiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/kanji',
      name: 'Kanji',
      component: KanjiView
    }
  ]
})

export default router
