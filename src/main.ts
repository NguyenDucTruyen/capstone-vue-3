import { QuillEditor } from '@vueup/vue-quill'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import './assets/index.css'
import './assets/custom/quill.css'
import './utils/zodLocale'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)

app.component('QuillEditor', QuillEditor)

router.isReady().then(() => {
  app.mount('#app')
})
