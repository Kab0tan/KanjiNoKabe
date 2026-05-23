import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRotateRight, faGraduationCap, faFlask } from '@fortawesome/free-solid-svg-icons'

library.add(faRotateRight, faGraduationCap, faFlask)

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(createPinia())
app.use(ElementPlus)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
