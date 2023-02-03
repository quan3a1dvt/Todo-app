import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router/router.js'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import 'v-calendar/dist/style.css';
import i18n from './lang/i18n'
const app = createApp(App);
app.use(i18n)
app.component('Datepicker', Datepicker)
app.use(router)
app.mount('#app');

