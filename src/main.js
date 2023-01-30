import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { createI18n } from 'vue-i18n'
// import vnMessage from './lang/vn.json'
// import enMessage from './lang/en.json'

const i18n = createI18n({
    locale: 'en',
    messages: {
      en: {
        name: 'Quốc Anh'
      }
    }
})

const app = createApp(App);
app.use(i18n)
app.component('Datepicker', Datepicker);
app.mount('#app');

