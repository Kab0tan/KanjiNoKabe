<template>
  <Dock :model="navItems" position="left">
    <template #item="{ item }">
      <RouterLink :to="item.to" v-tooltip.bottom="item.label">
        <FontAwesomeIcon :icon="item.icon" size="xl" />
      </RouterLink>
    </template>
  </Dock>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Dock from 'primevue/dock'
import './App.scss'

const navItems = ref([
  { label: 'Kanji Quiz', icon: ['fas', 'graduation-cap'], to: '/kanji' },
  { label: 'Playground', icon: ['fas', 'flask'], to: '/playground' }
])
</script>
