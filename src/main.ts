import '@/scss/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'aos/dist/aos.css'
import AOS from 'aos'

// Import Element Plus and its styles
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import VueApexCharts from 'vue3-apexcharts'
import '@fortawesome/fontawesome-free/css/all.css'

let vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueApexCharts)
app.use(ElementPlus);

// 👇 Insert this before mount
if (window.location.search.startsWith('?redirect=')) {
  const url = new URLSearchParams(window.location.search);
  const redirectTo = url.get('redirect');
  if (redirectTo) {
    history.replaceState(null, '', decodeURIComponent(redirectTo));
  }
}

app.mount('#app')

AOS.init()

let isVuetifyLoaded = false


router.beforeEach(async (to, from, next) => {
  if (to.name === 'Dashboard' && !isVuetifyLoaded) {
    const vuetifyModule = await import('./plugins/vuetify')
    vuetify = vuetifyModule.default
    app.use(vuetify)
    isVuetifyLoaded = true
    next()
  } else {
    next()
  }
})
