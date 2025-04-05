import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/styles/form_modal.scss'


const app = createApp(App)
app.use(createPinia())
app.mount('#app')

