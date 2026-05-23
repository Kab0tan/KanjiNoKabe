import { createRouter, createWebHistory } from 'vue-router'
import KanjiView from '../views/KanjiView/KanjiView.vue'
import PlaygroundView from '../views/PlaygroundView/PlaygroundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/kanji'
    },
    {
      path: '/kanji',
      name: 'Kanji',
      component: KanjiView
    },
    {
      path: '/playground',
      name: 'Playground',
      component: PlaygroundView
    }
  ]
})

export default router
