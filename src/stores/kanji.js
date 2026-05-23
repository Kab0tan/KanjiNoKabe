import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import defaultKanji from '@/assets/constants/N5.json'

export const useKanjiStore = defineStore('kanjiStore', () => {
  //left panel
  const level = ref(5)
  //right panel
  const questionsLength = ref(5)
  const questionType = ref('definition')
  const gameType = ref('mqc')

  //main panel
  const kanjisList = ref(defaultKanji)
  const score = ref(0)
  const wrongAnswers = ref(0)
  const optionsList = ref(defaultKanji.map((item) => item.english))
  const randomItems = ref([])
  const currentKanjiIndex = ref(0)
  const isPlaying = ref(true)
  const hasClicked = ref(false)
  const myInputAnswer = ref('')
  const lastSubmittedAnswer = ref(null)
  const lastAnswerCorrect = ref(false)

  const currentKanji = computed(() => {
    return kanjisList?.value[currentKanjiIndex?.value]
  })

  const kanjiIdeogram = computed(() => {
    return currentKanji?.value.kanji
  })

  const correctAnswer = computed(() => {
    if (questionType.value === 'definition') {
      return currentKanji.value.english
    }
    return {
      onyomi: currentKanji.value.onyomi,
      kunyomi: currentKanji.value.kunyomi
    }
  })

  const dynamicRandomItem = computed(() => {
    if (questionType.value == 'definition') {
      return randomItems.value.map((tmp) => [tmp])
    } else {
      return randomItems.value.map((tmp) => {
        return ['Onyomi: ' + tmp.onyomi, 'Kunyomi: ' + tmp.kunyomi]
      })
    }
  })

  const kanjiCache = {}

  const loadKanjiData = async () => {
    try {
      if (!kanjiCache[level.value]) {
        const data = await import(`@/assets/constants/N${level.value}.json`)
        kanjiCache[level.value] = data.default
      }
      kanjisList.value = shuffleArray(kanjiCache[level.value])
      handleQuestionType()
      refresh()
    } catch (error) {
      console.error('Failed to load kanji data:', error)
    }
  }

  const handlePlay = () => {
    isPlaying.value = true
    score.value = 0
    wrongAnswers.value = 0
    currentKanjiIndex.value = 0
    kanjisList.value = shuffleArray(kanjisList.value)
    refresh()
  }

  const handleSubmission = (event) => {
    if (hasClicked.value) return
    lastSubmittedAnswer.value = event
    const isCorrect =
      event === currentKanji.value.english ||
      (event.onyomi === currentKanji.value.onyomi && event.kunyomi === currentKanji.value.kunyomi)
    lastAnswerCorrect.value = isCorrect
    if (isCorrect) {
      score.value++
    } else {
      wrongAnswers.value++
    }
    hasClicked.value = true
    setTimeout(() => {
      if (score.value + wrongAnswers.value < questionsLength.value) {
        currentKanjiIndex.value++
        refresh()
      } else {
        hasClicked.value = false
      }
    }, 500)
  }

  const handleInput = () => {
    if (hasClicked.value) return
    const input = myInputAnswer.value.trim().toLowerCase()
    let isCorrect = false
    if (questionType.value === 'definition') {
      isCorrect = input === currentKanji.value.english.toLowerCase()
    } else {
      isCorrect =
        input === (currentKanji.value.onyomi || '').toLowerCase() ||
        input === (currentKanji.value.kunyomi || '').toLowerCase()
    }
    lastAnswerCorrect.value = isCorrect
    if (isCorrect) {
      score.value++
    } else {
      wrongAnswers.value++
    }
    hasClicked.value = true
    setTimeout(() => {
      if (score.value + wrongAnswers.value < questionsLength.value) {
        currentKanjiIndex.value++
        myInputAnswer.value = ''
        refresh()
      } else {
        hasClicked.value = false
      }
    }, 500)
  }

  const handleQuestionType = () => {
    if (kanjisList.value.length > 0) {
      if (questionType.value === 'definition') {
        optionsList.value = kanjisList.value.map((item) => item.english)
      } else {
        optionsList.value = kanjisList.value.map((item) => {
          return { onyomi: item.onyomi, kunyomi: item.kunyomi }
        })
      }
      handlePlay()
    }
  }

  const handleGameType = () => {
    handlePlay()
  }

  const shuffleArray = (array) => {
    if (array.length <= 1) return array
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = shuffledArray[i]
      shuffledArray[i] = shuffledArray[j]
      shuffledArray[j] = temp
    }
    return shuffledArray
  }

  //fill ref randomItems with 3 random options from _data
  const getRandomAnswers = (_data) => {
    const optionsListCopy = _data.value.slice()
    randomItems.value = []
    for (let i = 0; i < 3; i++) {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * optionsListCopy.length)
      } while (
        questionType.value === 'definition'
          ? optionsListCopy[randomIndex] === currentKanji.value.english
          : optionsListCopy[randomIndex]?.onyomi === currentKanji.value.onyomi &&
            optionsListCopy[randomIndex]?.kunyomi === currentKanji.value.kunyomi
      )
      randomItems.value.push(optionsListCopy[randomIndex])
      optionsListCopy.splice(randomIndex, 1)
    }
  }
  const refresh = () => {
    hasClicked.value = false
    getRandomAnswers(optionsList)
    const index = Math.floor(Math.random() * (randomItems.value.length + 1))
    //adding true answer at random index in randomItems
    if (questionType.value === 'definition') {
      randomItems.value.splice(index, 0, currentKanji.value.english)
    } else {
      randomItems.value.splice(index, 0, {
        onyomi: currentKanji.value.onyomi,
        kunyomi: currentKanji.value.kunyomi
      })
    }
  }

  return {
    //state
    level,
    questionsLength,
    questionType,
    gameType,
    score,
    wrongAnswers,
    kanjisList,
    currentKanjiIndex,
    randomItems,
    isPlaying,
    hasClicked,
    optionsList,
    myInputAnswer,
    lastSubmittedAnswer,
    lastAnswerCorrect,
    //getters
    kanjiIdeogram,
    correctAnswer,
    dynamicRandomItem,
    //actions
    loadKanjiData,
    handlePlay,
    handleSubmission,
    handleInput,
    handleQuestionType,
    handleGameType,
    shuffleArray,
    refresh,
    getRandomAnswers
  }
})
