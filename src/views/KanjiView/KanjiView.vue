<template>
  <ElRow>
    <ElCol :span="8">
      <KanjiLeftPanel />
    </ElCol>
    <ElCol :span="9">
      <ElRow justify="center" class="main-row">
        <div class="quiz-card">
          <div class="quiz-card--question">{{ kanjiIdeogram }}</div>
        </div>
      </ElRow>
      <ElRow justify="center">
        <ElCol v-if="gameType === 'mqc'">
          <ElRow justify="center">
            <button
              :disabled="!isPlaying"
              :class="{
                correct: randomItems[0] === myAnswer && hasClicked,
                answer: randomItems[0] !== myAnswer || !hasClicked
              }"
              @click="handleSubmission(randomItems[0])"
            >
              <template v-for="(field, index) in dynamicRandomItem[0]" :key="index">
                <span>{{ field }}</span>
                <br />
              </template>
            </button>
            <button
              :disabled="!isPlaying"
              :class="{
                correct: randomItems[1] === myAnswer && hasClicked,
                answer: randomItems[1] !== myAnswer || !hasClicked
              }"
              @click="handleSubmission(randomItems[1])"
            >
              <template v-for="(field, index) in dynamicRandomItem[1]" :key="index">
                <span>{{ field }}</span>
                <br />
              </template>
            </button>
          </ElRow>
          <ElRow justify="center">
            <button
              :disabled="!isPlaying"
              :class="{
                correct: randomItems[2] === myAnswer && hasClicked,
                answer: randomItems[2] !== myAnswer || !hasClicked
              }"
              @click="handleSubmission(randomItems[2])"
            >
              <template v-for="(field, index) in dynamicRandomItem[2]" :key="index">
                <span>{{ field }}</span>
                <br />
              </template>
            </button>
            <button
              :disabled="!isPlaying"
              :class="{
                correct: randomItems[3] === myAnswer && hasClicked,
                answer: randomItems[3] !== myAnswer || !hasClicked
              }"
              @click="handleSubmission(randomItems[3])"
            >
              <template v-for="(field, index) in dynamicRandomItem[3]" :key="index">
                <span>{{ field }}</span>
                <br />
              </template>
            </button>
          </ElRow>
        </ElCol>
        <ElCol v-else>
          <ElInput
            v-model="myInputAnswer"
            :disabled="!isPlaying"
            @keyup.enter="handleInput"
            :class="{
              input__correct: myAnswer.includes(myInputAnswer) && myInputAnswer && hasClicked,
              input__wrong: (!myAnswer.includes(myInputAnswer) || !myInputAnswer) && hasClicked
            }"
          ></ElInput>
        </ElCol>
      </ElRow>
      <ElRow justify="space-around">
        <span class="score"> {{ score }} / {{ questionsLength }} </span>
        <span class="errors"> {{ wrongAnswers }} / {{ questionsLength }} </span>
      </ElRow>
    </ElCol>
    <ElCol :span="7">
      <KanjiRightPanel />
    </ElCol>
  </ElRow>
</template>

<script setup>
import './KanjiView.scss'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import KanjiLeftPanel from './KanjiLeftPanel/KanjiLeftPanel.vue'
import KanjiRightPanel from './KanjiRightPanel/KanjiRightPanel.vue'
import data from '../../assets/constants/N5.json'
import { useKanjiStore } from '@/stores/kanji'

const kanjiStore = useKanjiStore()

const {
  questionsLength,
  score,
  wrongAnswers,
  isPlaying,
  kanjisList,
  dynamicRandomItem,
  randomItems,
  myAnswer,
  hasClicked,
  kanjiIdeogram,
  gameType,
  myInputAnswer
} = storeToRefs(kanjiStore)

const { shuffleArray, refresh, handleSubmission, handleInput } = kanjiStore

// const open = () => {
//   ElMessageBox.alert('This is a message', 'Title', {
//     // if you want to disable its autofocus
//     // autofocus: false,
//     confirmButtonText: 'OK',
//     callback: (action: Action) => {
//       ElMessage({
//         type: 'info',
//         message: `action: ${action}`,
//       })
//     },
//   })
// }

//-------------lifecycle hooks
onMounted(() => {
  kanjisList.value = shuffleArray(data)
  refresh()
})

watch(() => {
  if (score.value + wrongAnswers.value == questionsLength.value) {
    isPlaying.value = false
  }
})
</script>
