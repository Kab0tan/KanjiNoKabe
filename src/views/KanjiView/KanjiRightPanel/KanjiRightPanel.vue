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
    <ElRow class="right-kanji__switch_mode" justify="center">
      <ElCol :span="6" class="right-kanji__switch_mode--col">
        <ElText>Romanji</ElText>
      </ElCol>
      <ElCol :span="4" class="right-kanji__switch_mode--col">
        <ElSwitch
          v-model="questionType"
          size="large"
          active-value="definition"
          inactive-value="romanji"
          @change="handleQuestionType"
        />
      </ElCol>
      <ElCol :span="6" class="right-kanji__switch_mode--col">
        <ElText>Definition</ElText>
      </ElCol>
    </ElRow>
    <ElRow class="right-kanji__switch_mode" justify="center">
      <ElCol :span="6" class="right-kanji__switch_mode--col">
        <ElText>Input</ElText>
      </ElCol>
      <ElCol :span="4" class="right-kanji__switch_mode--col">
        <ElSwitch
          v-model="gameType"
          size="large"
          active-value="mqc"
          inactive-value="input"
          @change="handleGameType"
        />
      </ElCol>
      <ElCol :span="6" class="right-kanji__switch_mode--col">
        <ElText>MQC</ElText>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup>
import './KanjiRightPanel.scss'
import { useKanjiStore } from '@/stores/kanji'
import { ElCol } from 'element-plus'
import { storeToRefs } from 'pinia'

const kanjiStore = useKanjiStore()

const { questionsLength, questionType, gameType } = storeToRefs(kanjiStore)

const { handlePlay, handleQuestionType, handleGameType } = kanjiStore
</script>
