import { createRouter, createWebHistory } from 'vue-router'
import KanjiView from '../views/KanjiView/KanjiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/kanji',
      name: 'Kanji',
      component: KanjiView
    }
  ]
})

export default router
