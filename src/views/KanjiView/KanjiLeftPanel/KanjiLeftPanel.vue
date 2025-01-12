<template>
  <ElRadioGroup v-model="level" class="level">
    <ElRadio :value="1" size="large"> N1 </ElRadio>
    <ElRadio :value="2" size="large"> N2 </ElRadio>
    <ElRadio :value="3" size="large"> N3 </ElRadio>
    <ElRadio :value="4" size="large"> N4 </ElRadio>
    <ElRadio :value="5" size="large"> N5 </ElRadio>
  </ElRadioGroup>
</template>

<script setup>
import './KanjiLeftPanel.scss'
import { watch } from 'vue'
import { useKanjiStore } from '@/stores/kanji'
import { storeToRefs } from 'pinia'

const kanjiStore = useKanjiStore()
const { loadKanjiData } = kanjiStore

const { level } = storeToRefs(kanjiStore)

watch(level, () => {
  loadKanjiData()
})
</script>
