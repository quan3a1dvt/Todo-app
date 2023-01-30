import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueI18n from 'vue-i18n'
// import vnMessage from './lang/vn.json'
// import enMessage from './lang/en.json'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'en',
    messages: {
      en: {
        name: 'Quốc Anh'
      }
    }
})
const app = createApp(App);

app.component('Datepicker', Datepicker);
app.mount('#app');

