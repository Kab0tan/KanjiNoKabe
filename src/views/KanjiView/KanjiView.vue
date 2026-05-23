<template>
  <ElRow :gutter="16" style="flex-wrap: wrap">
    <!-- leftPanel -->
    <ElCol :xs="24" :md="8" class="panel-left">
      <KanjiLeftPanel />
    </ElCol>
    <!-- centerPanel -->
    <ElCol :xs="24" :md="9" class="panel-center">
      <!-- ideogram symbol -->
      <ElRow justify="center" class="main-row">
        <div class="quiz-card">
          <div class="quiz-card--question">{{ kanjiIdeogram }}</div>
        </div>
      </ElRow>
      <!-- answer options -->
      <ElRow justify="center">
        <!-- mqc mode -->
        <ElCol v-if="gameType === 'mqc'">
          <ElRow justify="center">
            <button
              :disabled="!isPlaying || hasClicked"
              :class="
                checkAnswer(randomItems[0])
                  ? 'correct'
                  : isWrongAnswer(randomItems[0])
                    ? 'wrong'
                    : 'answer'
              "
              @click="handleSubmission(randomItems[0])"
            >
              <template v-for="(field, index) in dynamicRandomItem[0]" :key="index">
                <span>{{ field }}</span>
                <br />
              </template>
            </button>
            <button
              :disabled="!isPlaying || hasClicked"
              :class="
                checkAnswer(randomItems[1])
                  ? 'correct'
                  : isWrongAnswer(randomItems[1])
                    ? 'wrong'
                    : 'answer'
              "
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
              :disabled="!isPlaying || hasClicked"
              :class="
                checkAnswer(randomItems[2])
                  ? 'correct'
                  : isWrongAnswer(randomItems[2])
                    ? 'wrong'
                    : 'answer'
              "
              @click="handleSubmission(randomItems[2])"
            >
              <template v-for="(field, index) in dynamicRandomItem[2]" :key="index">
                <span>{{ field }}</span>
                <br />
              </template>
            </button>
            <button
              :disabled="!isPlaying || hasClicked"
              :class="
                checkAnswer(randomItems[3])
                  ? 'correct'
                  : isWrongAnswer(randomItems[3])
                    ? 'wrong'
                    : 'answer'
              "
              @click="handleSubmission(randomItems[3])"
            >
              <template v-for="(field, index) in dynamicRandomItem[3]" :key="index">
                <span>{{ field }}</span>
                <br />
              </template>
            </button>
          </ElRow>
        </ElCol>
        <!-- input answer mode -->
        <ElCol v-else>
          <ElInput
            v-model="myInputAnswer"
            :disabled="!isPlaying"
            @keyup.enter="handleInput"
            :class="{
              input__correct: lastAnswerCorrect && hasClicked,
              input__wrong: !lastAnswerCorrect && hasClicked
            }"
          ></ElInput>
        </ElCol>
      </ElRow>
      <!-- score and errors -->
      <ElRow justify="space-around">
        <span class="score"> {{ score }} / {{ questionsLength }} </span>
        <span class="errors"> {{ wrongAnswers }} / {{ questionsLength }} </span>
      </ElRow>
    </ElCol>
    <!-- rightPanel -->
    <ElCol :xs="24" :md="7" class="panel-right">
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
import defaultKanji from '@/assets/constants/N5.json'
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
  correctAnswer,
  hasClicked,
  kanjiIdeogram,
  gameType,
  myInputAnswer,
  questionType,
  lastSubmittedAnswer,
  lastAnswerCorrect
} = storeToRefs(kanjiStore)

const { shuffleArray, refresh, handleSubmission, handleInput } = kanjiStore

const checkAnswer = (submission) => {
  if (questionType.value === 'definition') {
    return submission === correctAnswer.value && hasClicked.value
  } else {
    return JSON.stringify(submission) === JSON.stringify(correctAnswer.value) && hasClicked.value
  }
}

const isWrongAnswer = (submission) => {
  if (!hasClicked.value || checkAnswer(submission)) return false
  if (questionType.value === 'definition') {
    return submission === lastSubmittedAnswer.value
  }
  return JSON.stringify(submission) === JSON.stringify(lastSubmittedAnswer.value)
}

//-------------lifecycle hooks
onMounted(async () => {
  kanjisList.value = shuffleArray(defaultKanji)
  refresh()
})

watch(() => {
  if (score.value + wrongAnswers.value == questionsLength.value) {
    isPlaying.value = false
  }
})
</script>
