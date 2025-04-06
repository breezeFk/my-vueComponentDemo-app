import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import card from './components/card.vue'

const app = createApp(App)
app.component('card', card)  // 正确的注册方式
app.mount('#app')
