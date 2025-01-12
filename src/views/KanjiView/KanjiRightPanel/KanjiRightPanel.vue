<template>
  <div class="right-kanji">
    <ElButton
      size="large"
      :round="true"
      type="primary"
      @click="handlePlay"
      class="right-kanji--button"
    >
      <FontAwesomeIcon :icon="['fas', 'rotate-right']" />
    </ElButton>
    <ElSlider v-model="questionsLength" :max="80" show-input class="right-kanji--slider" />
    <ElSwitch
      v-model="questionType"
      size="large"
      active-text="Definition"
      inactive-text="Romanji"
      active-value="definition"
      inactive-value="romanji"
      @change="handleQuestionType"
    />
    <ElSwitch
      v-model="gameType"
      size="large"
      active-text="MQC"
      inactive-text="Input text"
      active-value="mqc"
      inactive-value="input"
      @change="handleGameType"
    />
  </div>
</template>

<script setup>
import './KanjiRightPanel.scss'
import { useKanjiStore } from '@/stores/kanji'
import { storeToRefs } from 'pinia'

const kanjiStore = useKanjiStore()

const { questionsLength, questionType, gameType } = storeToRefs(kanjiStore)

const { handlePlay, handleQuestionType, handleGameType } = kanjiStore
</script>
