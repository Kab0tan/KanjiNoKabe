<template>
  <ElMenu mode="horizontal">
    <ElMenuItem index="1">
      <RouterLink to="/home"> Home </RouterLink>
    </ElMenuItem>
    <ElMenuItem index="2" route="/kanji">
      <RouterLink to="/kanji"> Kanji Quiz </RouterLink>
    </ElMenuItem>
  </ElMenu>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ElMenuItem } from 'element-plus'
import './App.scss'
</script>
